from fastapi import FastAPI
app = FastAPI()

@app.get("/similarity")
def hello():
  print("running big")
  return bigfunction()

import os
import openai
import json
from tqdm.auto import tqdm
import pinecone
from time import sleep
import random

# get API key from top-right dropdown on OpenAI website
openai.api_key = os.getenv("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") or "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"

openai.Engine.list()  # check we have authenticated


def bigfunction():
    jsoninput = open("input.json")
    def complete(prompt):
        # query text-davinci-003
        res = openai.Completion.create(
            engine='text-davinci-003',
            prompt=prompt,
            temperature=0,
            max_tokens=400,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0,
            stop=None
        )
        return res['choices'][0]['text'].strip()

    #we have to run a query for each instance of a house that the investor has bought 

    entry = json.load(jsoninput)
    newDict = {}
    newDict["square footage"] = entry["sqft"]
    newDict["price"] = entry["price"]
    newDict["year built"] = entry["yearBuilt"]
    newDict["bedrooms"] = entry["bedrooms"]
    newDict["bathrooms"] = entry["bathrooms"]

    query = str(newDict)
    embed_model = "text-embedding-ada-002"


    # initialize connection to pinecone (get API key at app.pinecone.io)
    api_key = os.getenv("9101819c-76c6-46ea-9a80-107641e51e0a") or "9101819c-76c6-46ea-9a80-107641e51e0a"
    # find your environment next to the api key in pinecone console
    env = os.getenv("asia-northeast1-gcp") or "asia-northeast1-gcp"

    pinecone.init(api_key=api_key, environment=env)
    pinecone.whoami()

    index_name = 'gen-qa-openai2'

    # check if index already exists (it shouldn't if this is first time)
    if index_name not in pinecone.list_indexes():
        # if does not exist, create index
        pinecone.create_index(
            index_name,
            dimension=len(res['data'][0]['embedding']),
            metric='cosine',
            metadata_config={'indexed': ['channel_id', 'published']}
        )
    # connect to index
    index = pinecone.GRPCIndex(index_name)
    # view index stats
    index.describe_index_stats()


    res = openai.Embedding.create(
        input=[query],
        engine=embed_model
    )


    # retrieve from Pinecone
    xq = res['data'][0]['embedding']

    # get relevant contexts (including the questions)
    res = index.query(xq, top_k=2, include_metadata=True)
    limit = 3750

    def retrieve(query):
        res = openai.Embedding.create(
            input=[query],
            engine=embed_model
        )

        # retrieve from Pinecone
        xq = res['data'][0]['embedding']

        # get relevant contexts
        res = index.query(xq, top_k=2, include_metadata=True)
       # for x in res["matches"]:
       #     print(x)
        relevancy = [x['score'] for x in res['matches']]
        contexts = []
        for x in res["matches"]:

            sampleDict = x['metadata'].copy()
            sampleDict["relevancy"] = x['score']
            contexts.append(sampleDict.copy())
       
        print(contexts)
        #print(len(contexts))
        dictionary = {}
        dictionary["output"] = contexts[0]

 
        # build our prompt with the retrieved contexts included
        prompt_start = (
            "You are a real estate agent describing to an investor why they should invest in a certain home. Using their past" + 
            "investment choices, convince them that the property with the statistics given below is ideal to invest in: \n\n" + 
            "STATISTICS: \n\n\n" + str(contexts[0])

        )

        prompt_end = (
            f"\n\nQuestion: {query}\nAnswer:"
        )

        prompt = prompt_start + prompt_end

        
        return dictionary, prompt

    dictionary, query_with_contexts = retrieve(query)
    dictionary["chatgpt"] = (complete(query_with_contexts))
    print(dictionary)
    return json.dumps(dictionary)


# bigfunction()
