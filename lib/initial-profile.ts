import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";

export const initialProfile = async () => {
  const user = await currentUser();

  // console.log('user', user)
  //If user is not null - then sign-in page
  if (!user) {
    return redirectToSignIn();
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  // console.log('first', profile)

  if (profile) {
    return profile;
  }

  // const newProfile = await db.profile.cr

  //If user not found create new user in db
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName}${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};
