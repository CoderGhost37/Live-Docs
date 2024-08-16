'use server';

import { parseStringify } from '@/lib/utils';
import { clerkClient } from '@clerk/nextjs/server';

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    const { data } = await clerkClient.users.getUserList({
      emailAddress: userIds,
    });

    const users = data.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      avatar: user.imageUrl,
    }));

    const sortedUsers = userIds.map((email) =>
      users.find((user) => user.email === email),
    );

    return {
      success: true,
      message: 'Users fetched successfully',
      data: parseStringify(sortedUsers),
    };
  } catch (error: any) {
    console.log(`Error fetching users: ${error}`);
    return {
      success: false,
      message: 'Error fetching users',
      data: error.message,
    };
  }
};
