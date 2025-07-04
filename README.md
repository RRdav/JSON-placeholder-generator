Generate a placeholder JSON easily!

# Placeholder Generator

A simple console application to generate JSON data placeholders for various purposes.

## Features
- Generate JSON data
- Using:
    - --products
    - --users
    - --posts

## Instructions
1. Install the package globally:
   ```bash
   npm install -g rrd-placeholder-generator
   ```
2. Use the command line to generate placeholders.
    ```bash
    placeholder-generator generate --products
    placeholder-generator generate --users
    placeholder-generator generate --posts
    ```
3. If you don't want to install it globally, you can run the following command:
   ```bash
   npx rrd-placeholder-generator generate --products
   ```
   or
   ```bash
   npx rrd-placeholder-generator generate --users
   ```
   or
   ```bash
   npx rrd-placeholder-generator generate --posts
   ```
4. The generated JSON will be outputted in the root directory of your project.

## Usage
Run the application with the desired command:

```bash
placeholder-generator generate --products
placeholder-generator generate --users
placeholder-generator generate --posts
```
