import { userData } from "../mocks/data";

// Mock API function - in real app this would be in a separate file
export const fetchUserProfile = async (userId: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulate different responses based on userId
    if (userId === 'error') {
        throw new Error('Failed to fetch user profile');
    }

    if (userId === 'notfound') {
        throw new Error('User not found');
    }

    return userData[userId] || null;
};
