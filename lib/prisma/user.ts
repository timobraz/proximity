import prisma from "./index";

export interface UserI {
  name: string;
  createdAt?: Date;
  email: string;
  password: string;
  isSeller?: boolean;
  isBusiness?: boolean;
}
// export async function getGuests() {
//   try {
//     const guests = await prisma.guest.findMany();
//     return { guests };
//   } catch (error) {
//     return { error };
//   }
// }

export async function createUser(user: UserI) {
  try {
    const created = await prisma.user.create({
      data: { name: user.name.toLowerCase(), email: user.email.toLowerCase(), password: user.password, isSeller: user.isSeller },
    });
    return { user: created };
  } catch (error) {
    return { error };
  }
}

// export async function deleteGuest(name: string) {
//   try {
//     const created = await prisma.guest.delete({ where: { name: name.toLowerCase() } });
//     return { memo: created };
//   } catch (error) {
//     return { error };
//   }
// }
