import submitForm from './SubmitForm';

export function HtmlForm() {
    return (
        <form
            // Ignore the onSubmit prop, it's used by GFE to
            // intercept the form submit event to check your solution.
            onSubmit={submitForm}
            action="https://questions.greatfrontend.com/api/questions/contact-form"
            method='post'
        >
            <label htmlFor="name">Name</label>
            <input id="name" type="text" name="name" />
            <br />

            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" />
            <br />

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" />
            <br />
            <input type="submit" value="Send" aria-label="send" />

        </form>
    );
}


export default HtmlForm