# Tutorial style guide

Tutorials are guides that walk users through specific actions to achieve a goal. Tutorials should start from scratch. Tutorials should teach the basics of getting started, and include one real-world example of a specific action. 

For more information on tutorials, visit the [Diataxis framework site](https://diataxis.fr/tutorials/)

## Audience

The audience for a tutorial is a complete beginner. Do not assume any prerequisites, other than the very basics: they have a terminal and a code editor installed, and they know how to copy, paste, and press enter. All other instruction should be written out. Any required dependencies or installations should be included in the [prerequisites](#prerequisites) section.


## Writing style

Tutorials are written in inviting and clear language. Tutorials should include the necessary information to help a user achieve a specific task. Tutorials start from the begining, and do not assume prior knowledge of the subject. 

Tutorials are action-oriented. Try not to include information that is not necessary to the action being described. If you want to include supplemental information, create an [explanation](https://diataxis.fr/explanation/) page and link out to it. 

### Simplicity

Simplicity is at the heart of the Terra style. Writers and readers will understand each other better with a minimalist writing approach. Writing in this style does not mean that you should be less descriptive or vague. It means that clarity is emphasized over complexity. 

Writing in shorter sentences can give your writing more clarity. Try to limit the amount of clauses in a sentence, and simplify your language. Avoid jargon and overly-technical language. 

Blocks of text are daunitng and are usually left unread in action-based tutorials. Instead, limit paragraphs to three sentences. 

Remeber, you are writing to show off the functionality of Terra, and not using Terra to show off your writing. 

## Voice

All writing in the Terra docs is written in second or third person. 

First person language such as "I," "we," "us," or "let's" should be avoided in all situations. 

**Examples**: 
- "We recommend," becomes "it is recommended."
- "Let's use the following command," becomes "use the following command."
- "Our project," becomes "your project."

## Structure

### Title

Titles are written using sentence-style capitalization. The first word of a title is always capitalized. Most tutorials should be labeled "Get started with ____" . 

Titles should clearly reflect what the tutorial is about. Use imperatives in titles rather than gerunds.

**Example**: 
"# Starting The LCD" 
becomes 
"# Start the LCD" 

### Intro

The intro is a brief, 2-3 sentence introduction to the tutorial. You can include a basic overview of the tutorial in the intro. 

**Example**:

"Terra.js is the Terra network's Javascript SDK. In this tutorial, you will learn how to set up your environment, make a transaction, and..."


### Prerequisites

The prerequisite section should be at the top of the tutorial below the intro. This section should include all relevant dependencies necessary for completing the tutorial. List out prerequisites as links to a URL. Use an unordered list. List specific version numbers if necessary. All prerequisites for the tutorial should be listed in this section. Avoid ambushing users mid-tutorial with dependencies that aren't listed in the prerequisites. 

**Example**:

   ```md
   ## Prerequisites
   
   - [Install Terra.js](link-to-Station-installation)
   - [Create a wallet](link-to-wallet-tutorial)
   - [Node v17.0.0](link-to-installation-guide)
   - ...
   
   ```

### Steps

The steps make up the body of a tutorial. Step headings are numbered and describe the actions outlined in each step. 

If a step contains more than one specific action, it should be broken up into substeps. Number all substeps using an [ordred list](#ordered-lists).

**Example**:

   ```md
   ## 1. Set up your environment

   Before you can begin making transactions, you will need to scaffold your application.

   1. Use the following command to create a directory for your project:

      ```sh
      mkdir my-terra-dapp
      ```

   2. Enter your project directory and run `npm install`:

      ```sh
      cd my-terra-dapp
      npm install
      ```

   ```

See [headings](#headings) for more information.

## Formatting

### Code

Code should be in blocks. A command that a user needs to execute should be written in a code block rather than inline. Use `inline code` to refer to specific parts of code. 

**Example**:  Use the `start` command to run the application:

```sh
npm start
```

Use notes in code blocks sparingly. Most notes should be written above the code block. Anotations should be rederved for long code blocks. Code blocks in tutorials should be writtwen so that a user can copy and paste directy into their terminal using the copy button on each code block. 

### Inline code

Code mentioned outside of code blocks should always be writen in tick marks exactly as it appears.

**Example**:  

Use the `k.FunctionExapmle` function to create an example. 

Avoid starting sentences with code, as it makes capitalization and puctiation difficult. Never alter the punctuation or capitalization of code. Write it exactly as it appears. 

**Example**:  

All code goes inside `tick` marks, even when referring to specific `variables`.

### Examples

Examples are denoted in the following format:

**Example**: You can put a short intro to the example here. 

This is an example. 

### Headings

Headings denote sections in a document. Each page should contain a only one first level heading as its title. Headings below the title can be nested. Do not skip heading levels. Avoid using more than three heading levels in a document.

Headings that denote chronological steps are numbered. Headings used to denote non-chronological sections, such as explanations or stand-alone information, are not numbered.

All headings follow sentence-style capitalizaiton. Avoid starting a heading with in-line code. Headings should not have ending punctuation. 

### Lists

#### Ordered lists

#### Unordered lists

### Text styles

Don't use italics. Bold is used in the following cases:

- When referring to interface buttons. "Click **Send**."
- When denoting [examples](#examples). 

Note: punctuation is never styled.

### Links

Use descriptive text for links. Avoid using "here" as a placeholder.  

**Example**:

"For mor examples, visit the [example page](example.com). 
vs. 
"For more examples, click [here](example.com)." 

Descriptive links helps the user understand where they are going when they click the link. 

### Punctuation

Simplify your writing. While tempting, em dashes promote unecessary complexity and ambiguous grammar. 

Punctuation integral to a sentence should never be styled or included in a link.

**Example**:

Period outside of link: 
"Visit the [example page](example.com). "
vs 
Comma outside of code: 
"The three commands are `start`, `end`, and `help`. 


Use the Oxford comma. 
