// wirte test for user pfrfile component
import React, { useEffect, useState } from 'react';
// import { fetchUserProfile } from '@/api/user'; // Assume this is the API call to fetch user profile
import { render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { UserProfile } from './user-profile'; // Adjust the import path as necessary
import { userData } from '@/app/mocks/data';

describe('UserProfile Component', () => {
    it('should display loading when userId is provided', async () => {
        const userId = '1';
        render(<UserProfile userId={userId} />);

        // Wait for the user profile to load
        expect(screen.getByText('Loading user profile...')).toBeInTheDocument()
    })

    it('should display user profile when userId is provided', async () => {
        const user = userData['1']
        render(<UserProfile userId={user.id} />);

        // Wait for the user profile to load
        const userName = await screen.findByText(user.name); // default timeout is 1000ms
        expect(userName).toBeInTheDocument();

        expect(screen.queryByText('Loading user profile...')).not.toBeInTheDocument();
    })
})

