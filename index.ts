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
  .action((options) => {
    // Determine which placeholder to generate based on the options
    let APIurl = ''
    let selectedOption = ''
    if (options.products) {
        console.log('Generating products placeholder...');
        APIurl = 'https://dummyjson.com/products';
        selectedOption = 'products';
    } else if (options.users) {
        console.log('Generating users placeholder...');
        APIurl = 'https://dummyjson.com/users';
        selectedOption = 'users';
    } else if (options.posts) {
        console.log('Generating posts placeholder...');
        APIurl = 'https://dummyjson.com/posts';
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