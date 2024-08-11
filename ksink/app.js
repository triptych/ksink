import { examples } from './examples.js';

const navElement = document.getElementById('main-nav');
const contentElement = document.getElementById('content');

const createNavigation = () => {
    const ul = document.createElement('ul');
    Object.keys(examples).forEach(category => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${category}`;
        a.textContent = category;
        li.appendChild(a);
        ul.appendChild(li);
    });
    navElement.appendChild(ul);
};

const loadContent = (category) => {
    contentElement.innerHTML = '';
    const h2 = document.createElement('h2');
    h2.textContent = category;
    contentElement.appendChild(h2);

    const categoryExamples = examples[category];
    if (Array.isArray(categoryExamples)) {
        categoryExamples.forEach(createExampleSection);
    } else if (typeof categoryExamples === 'object') {
        Object.values(categoryExamples).forEach(createExampleSection);
    }
};

const createExampleSection = (example) => {
    const section = document.createElement('section');
    const h3 = document.createElement('h3');
    h3.textContent = example.title;
    section.appendChild(h3);

    const description = document.createElement('p');
    description.textContent = example.description;
    section.appendChild(description);

    const runButton = document.createElement('button');
    runButton.textContent = 'Run Example';
    runButton.addEventListener('click', async () => {
        if (await checkAuthentication()) {
            example.run(section);
        } else {
            const output = document.createElement('pre');
            output.textContent = 'Please authenticate with Puter to run this example.';
            section.appendChild(output);
        }
    });
    section.appendChild(runButton);

    contentElement.appendChild(section);
};

const checkAuthentication = async () => {
    try {
        await puter.auth.getUser();
        return true;
    } catch (error) {
        console.error('Authentication error:', error);
        try {
            await puter.auth.signIn();
            return true;
        } catch (signInError) {
            console.error('Sign-in error:', signInError);
            return false;
        }
    }
};

const handleHashChange = () => {
    const category = window.location.hash.slice(1) || Object.keys(examples)[0];
    loadContent(category);
};

createNavigation();
window.addEventListener('hashchange', handleHashChange);
handleHashChange();