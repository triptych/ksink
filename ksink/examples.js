const createOutputElement = () => {
    const output = document.createElement('pre');
    output.classList.add('output');
    return output;
};

const handleError = (error, output) => {
    console.error('Error:', error);
    output.textContent = `Error: ${error.message || error}`;
    if (error.message && error.message.includes('authentication')) {
        output.textContent += '\nPlease make sure you are authenticated with Puter.';
    }
};

export const examples = {
    'CloudStorage': [
        {
            title: 'WriteFile',
            description: 'Create a new file called "hello.txt" containing "Hello, world!"',
            run: async (container) => {
                const output = createOutputElement();
                container.appendChild(output);
                try {
                    console.log('Attempting to write file...');
                    const file = await puter.fs.write('hello.txt', 'Hello, world!');
                    console.log('File written:', file);
                    output.textContent = `File written successfully at: ${file.path}`;
                } catch (error) {
                    handleError(error, output);
                }
            }
        },
        {
            title: 'ReadFile',
            description: 'Read the contents of "hello.txt"',
            run: async (container) => {
                const output = createOutputElement();
                container.appendChild(output);
                try {
                    console.log('Attempting to read file...');
                    const blob = await puter.fs.read('hello.txt');
                    console.log('File read, blob:', blob);
                    const text = await blob.text();
                    console.log('File contents:', text);
                    output.textContent = `File contents: ${text}`;
                } catch (error) {
                    handleError(error, output);
                }
            }
        },
        {
            title: 'ListDirectory',
            description: 'List the contents of the current directory',
            run: async (container) => {
                const output = createOutputElement();
                container.appendChild(output);
                try {
                    console.log('Attempting to list directory contents...');
                    const items = await puter.fs.readdir('./');
                    console.log('Directory contents:', items);
                    output.textContent = `Directory contents:\n${items.map(item => item.name).join('\n')}`;
                } catch (error) {
                    handleError(error, output);
                }
            }
        }
    ],
    'KeyValueStore': [
        {
            title: 'SetKeyValue',
            description: 'Set a key-value pair in the cloud Key-Value Store',
            run: async (container) => {
                const output = createOutputElement();
                container.appendChild(output);
                try {
                    console.log('Attempting to set key-value pair...');
                    await puter.kv.set('exampleKey', 'exampleValue');
                    console.log('Key-value pair set successfully');
                    output.textContent = 'Key-value pair set successfully';
                } catch (error) {
                    handleError(error, output);
                }
            }
        },
        {
            title: 'GetValue',
            description: 'Get the value of a key from the cloud Key-Value Store',
            run: async (container) => {
                const output = createOutputElement();
                container.appendChild(output);
                try {
                    console.log('Attempting to get value...');
                    const value = await puter.kv.get('exampleKey');
                    console.log('Value retrieved:', value);
                    output.textContent = `Value: ${value}`;
                } catch (error) {
                    handleError(error, output);
                }
            }
        },
        {
            title: 'ListKeys',
            description: 'List all keys in the cloud Key-Value Store',
            run: async (container) => {
                const output = createOutputElement();
                container.appendChild(output);
                try {
                    console.log('Attempting to list keys...');
                    const keys = await puter.kv.list();
                    console.log('Keys listed:', keys);
                    output.textContent = `Keys: ${keys.join(', ')}`;
                } catch (error) {
                    handleError(error, output);
                }
            }
        }
    ],
    'AI': [
        {
            title: 'Chat with GPT-4o Mini',
            description: 'Send a message to GPT-4o Mini and get a response',
            run: async (container) => {
                const output = createOutputElement();
                container.appendChild(output);
                try {
                    console.log('Attempting to chat with AI...');
                    const response = await puter.ai.chat("What's the capital of France?");
                    console.log('AI response:', response);
                    output.textContent = `AI response: ${response}`;
                } catch (error) {
                    handleError(error, output);
                }
            }
        }
    ],
    'Hosting': [
        {
            title: 'Create a simple website',
            description: 'Create a simple website and host it on a random subdomain',
            run: async (container) => {
                const output = createOutputElement();
                container.appendChild(output);
                try {
                    console.log('Attempting to create and host a website...');
                    const dirName = puter.randName();
                    await puter.fs.mkdir(dirName);
                    await puter.fs.write(`${dirName}/index.html`, '<h1>Hello, Puter!</h1>');
                    const subdomain = puter.randName();
                    const site = await puter.hosting.create(subdomain, dirName);
                    console.log('Website created:', site);
                    output.textContent = `Website hosted at: https://${site.subdomain}.puter.site`;
                } catch (error) {
                    handleError(error, output);
                }
            }
        }
    ]
};
