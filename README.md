# Archon v1

July 2023 ~ September 2023 (3 months)

This is a personal web development project where I implemented an SPA using pure JavaScript. It is a fictional magazine site themed around architecture.

## Key Features

- **Content Hierarchy Layout**: Articles are arranged based on their importance, such as headline articles and editor's picks.
- **Category-based Articles**: Users can read a variety of architecture-related articles categorized by topics.
- **Ease of Navigation**:
  - Side navigation allows users to easily explore different sections of the site.
  - Grayscale mode enhances readability and usability for visually impaired users.
  - Users can filter and sort articles by contributors, tags, and dates to find content of interest easily.
- **Bookmark**: Users can bookmark articles to read later.
- **Various Media**: Content includes various media such as videos and images.
- **Article Recommendations**: Users can discover more content based on related or random article lists tailored to their interests.

## Technical Highlights

- Developed to function similarly to an SPA using JavaScript, implementing a router via the History API.
- Rendered data using HandlebarsJS and JSON files (simulated data loading using a mock data API).
- Used the BEM methodology and defined utility classes to modularize styles.

## Demonstration

<video src="https://github.com/urbanscratcher/project-magazine/assets/17016494/dd6ddd01-09bf-4f91-9fcc-77cdfa224d3c" controls></video>

[Visit Site](https://project-archon.netlify.app/)

## Technical Stack
### Frontend
- **Partial Rendering**: Handlebars.js
- **Language**: JavaScript
- **Styling**: CSS

### Backend
- None

### Development Environment
- **Source Code**: GitHub
- **Design**: Figma

### Cloud Services and Deployment
- **Hosting and Deployment**: Netlify

## Design Process
<video src="https://github.com/urbanscratcher/project-magazine/assets/17016494/6e5ea662-5aa4-4c94-90c5-8c62e9011c41" controls></video>

[View on Figma](https://www.figma.com/file/ulgZLkRfIVWfg6Hpi1Xmt3/%5BProject%5D-WD-Magazine?type=design&node-id=0%3A1&mode=design&t=0T2BBnd8bvOGt5uh-1)

---

## Retrospective

- Implementing an SPA structure using pure JavaScript highlighted the necessity and value of frameworks.
- Building a custom router helped me appreciate the importance of routing in React.
- Using the History API to implement back, forward, and URL management enhanced my understanding of browser navigation and state management.
- Designing with Figma underscored the importance of design systems and componentization.
- The process of using a template engine for partial rendering taught me about performance optimization.
- Studying script loading order (async, defer) provided insights into improving web page loading performance.

## Next

- Due to time constraints, I couldn't properly implement responsive design. I will ensure to include this in the next iteration.
- I plan to utilize frameworks or libraries to improve the efficiency and scalability of the code (→ V2).
