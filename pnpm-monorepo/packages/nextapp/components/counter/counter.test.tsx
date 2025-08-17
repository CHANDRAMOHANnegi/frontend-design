import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, test, expect } from 'vitest'
import { Counter } from './index'



describe('Counter Component', () => {
    test('should show initial count of 0', () => {
        // Arrange: Render the component
        render(<Counter initialCount={0} />)

        // Act: No action needed for initial render

        // Assert: Check that count 0 is displayed
        expect(screen.getByText('Count: 0')).toBeInTheDocument()
    })

    test('should increment count when increment button is clicked', async () => {
        // Arrange: Set up user interaction and render component
        const user = userEvent.setup()
        render(<Counter />)

        // Act: Click the increment button
        const incrementButton = screen.getByRole('button', { name: /increment/i })
        await user.click(incrementButton)

        // Assert: Count should now be 1
        expect(screen.getByText('Count: 1')).toBeInTheDocument()
    })

    test('should decrement count when decrement button is clicked', async () => {
        // Arrange: Set up user interaction and render component
        const user = userEvent.setup()
        render(<Counter />)

        // Act: Click the decrement button
        const decrementButton = screen.getByRole('button', { name: /decrement/i })
        await user.click(decrementButton)

        // Assert: Count should now be -1
        expect(screen.getByText('Count: -1')).toBeInTheDocument()
    })

    test('should multiple clicks should work properly when clicked multiple times', async () => {
        // Arrange: Set up user interaction and render component
        const user = userEvent.setup()
        render(<Counter />)

        // Act: Click the decrement button
        const decrementButton = screen.getByRole('button', { name: /decrement/i, })
        await user.click(decrementButton)
        await user.click(decrementButton)
        await user.click(decrementButton)
        await user.click(decrementButton)

        // Assert: Count should now be -1
        expect(screen.getByText('Count: -4')).toBeInTheDocument()
    })


    test("should handle mixed increment and decrement clicks", async () => {
        // Arrange: Set up user interaction and render component
        const user = userEvent.setup()
        render(<Counter initialCount={0} />)

        // Act: Click increment and decrement buttons
        const incrementButton = screen.getByRole('button', { name: /increment/i })
        const decrementButton = screen.getByRole('button', { name: /decrement/i })

        await user.click(incrementButton) // Count: 1
        await user.click(decrementButton) // Count: 0
        await user.click(incrementButton) // Count: 1
        await user.click(incrementButton) // Count: 2
        await user.click(decrementButton) // Count: 1

        // Assert: Final count should be 1
        expect(screen.getByText('Count: 1')).toBeInTheDocument()
    })

    test("should be accessible with keyboard navigation", async () => {
        // Arrange: Set up user interaction and render component
        const user = userEvent.setup()
        render(<Counter initialCount={0} />)

        // Act: Focus on the increment button and press Enter
        const incrementButton = screen.getByRole('button', { name: /increment/i })
        await user.tab() // Focus on the first button
        expect(incrementButton).toHaveFocus() // Ensure the increment button is focused
        await user.keyboard('{Enter}') // Press Enter

        // Assert: Count should now be 1
        expect(screen.getByText('Count: 1')).toBeInTheDocument()

        // Act: Focus on the decrement button and press Space
        const decrementButton = screen.getByRole('button', { name: /decrement/i })
        await user.tab() // Move focus to the decrement button
        expect(decrementButton).toHaveFocus() // Ensure the increment button is focused

        await user.keyboard('[Space]') // Press Enter

        // Assert: Count should now be 0
        expect(screen.getByText('Count: 0')).toBeInTheDocument()
    })

})