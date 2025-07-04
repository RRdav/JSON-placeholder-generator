#!/usr/bin/env node

import * as commander from 'commander';
import * as fs from 'fs';

const program = new commander.Command();
program.version('1.0.0')

program
    .command('generate')
    .description('Generate a placeholder JSON')
    .option('--products', 'Generate products placeholder')
    .option('--users', 'Generate users placeholder')
        .option('--posts', 'Generate posts placeholder')
    // Limit amount of data
    .option('--limit <number>', 'Limit the number of items in the placeholder', parseInt, 10)
    .action((options) => {
    // Determine which placeholder to generate based on the options
    let APIurl = ''
    let selectedOption = ''
    let limit = options.limit || 10; // Default limit to 10 if not provided
    if (options.products) {
        console.log('Generating products placeholder...');
        APIurl = `https://dummyjson.com/products?limit=${limit}&select=id,title,price,description,sku`;
        selectedOption = 'products';
    } else if (options.users) {
        console.log('Generating users placeholder...');
        APIurl = `https://dummyjson.com/users?limit=${limit}&select=id,firstName,lastName,age`;
        selectedOption = 'users';
    } else if (options.posts) {
        console.log('Generating posts placeholder...');
        APIurl = `https://dummyjson.com/posts?limit=${limit}&select=id,title,body,userId`;
        selectedOption = 'posts';
    } else {
        console.error('No valid option provided. Use --products, --users, or --posts.');
    }

    fetchData(APIurl);

    // Fetch data from API
    async function fetchData(url : string) {
        const response = await fetch(url);
        if(response.ok) {
            const data = await response.json();
            // Write the data to a JSON file in the current directory
            const fileName = `placeholder-${selectedOption}-${Date.now()}.json`;
            fs.writeFileSync(fileName, JSON.stringify(data, null, 1));
            console.log(`Placeholder JSON generated and saved as ${fileName}`);
        }
    }


  });


program.parse(process.argv);