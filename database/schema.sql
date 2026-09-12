-- LearnPath Relational Database Schema

-- Disable foreign key constraints during table creation
PRAGMA foreign_keys = OFF;

DROP TABLE IF EXISTS step_completions;
DROP TABLE IF EXISTS user_enrollments;
DROP TABLE IF EXISTS steps;
DROP TABLE IF EXISTS modules;
DROP TABLE IF EXISTS learning_paths;
DROP TABLE IF EXISTS users;

PRAGMA foreign_keys = ON;

-- Users Table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255) DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Learning Paths Table
CREATE TABLE learning_paths (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'General',
    difficulty VARCHAR(20) NOT NULL DEFAULT 'Beginner', -- Beginner, Intermediate, Advanced
    estimated_hours INTEGER DEFAULT 10,
    cover_image VARCHAR(255) DEFAULT 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600',
    creator_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Modules Table
CREATE TABLE modules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    path_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (path_id) REFERENCES learning_paths(id) ON DELETE CASCADE
);

-- Steps Table (Individual tasks/resources inside a module)
CREATE TABLE steps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    module_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    resource_type VARCHAR(20) NOT NULL DEFAULT 'article', -- article, video, quiz, project
    resource_url TEXT,
    estimated_minutes INTEGER DEFAULT 30,
    order_index INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
);

-- User Enrollments Table
CREATE TABLE user_enrollments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    path_id INTEGER NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (path_id) REFERENCES learning_paths(id) ON DELETE CASCADE,
    UNIQUE(user_id, path_id)
);

-- Step Completions Table (Track completed steps per user)
CREATE TABLE step_completions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    step_id INTEGER NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (step_id) REFERENCES steps(id) ON DELETE CASCADE,
    UNIQUE(user_id, step_id)
);

-- Initial Seed Data
INSERT INTO users (username, email, password_hash) 
VALUES ('admin', 'admin@learnpath.com', '$2a$10$wN3XnI/94rK3h5rB3nJv7.aZ1Gg3/7fH9jZg8k0lM2nO4p6q8r0s');

INSERT INTO learning_paths (title, description, category, difficulty, estimated_hours, cover_image, creator_id)
VALUES 
('Full-Stack Web Development', 'Master HTML, CSS, JavaScript, React, Node.js, and Databases from scratch.', 'Web Development', 'Beginner', 40, 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600', 1),
('Data Science & Machine Learning', 'Learn Python, Pandas, NumPy, Scikit-Learn, and Neural Networks.', 'Data Science', 'Intermediate', 50, 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600', 1),
('DevOps & Cloud Architecture', 'Understand Docker, Kubernetes, CI/CD pipelines, and AWS fundamentals.', 'DevOps', 'Advanced', 35, 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600', 1),
('UI/UX Product Design', 'Turn user needs into clear interfaces, clickable prototypes, and thoughtful product experiences.', 'Design', 'Beginner', 24, 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600', 1),
('Cybersecurity Foundations', 'Build practical security habits while learning networks, threats, identity, and incident response.', 'Cybersecurity', 'Intermediate', 30, 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600', 1),
('Mobile App Development with React Native', 'Create polished cross-platform mobile apps with React Native, navigation, and API data.', 'Mobile Development', 'Intermediate', 32, 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600', 1),
('Product Management Essentials', 'Learn to discover valuable problems, prioritize the roadmap, and ship products users need.', 'Product', 'Beginner', 18, 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600', 1);

-- Seed Modules for Path 1
INSERT INTO modules (path_id, title, description, order_index) VALUES
(1, 'Module 1: HTML & CSS Fundamentals', 'Building static, responsive web pages.', 1),
(1, 'Module 2: JavaScript Mastery', 'Core JS concepts, ES6+, Async/Await, and DOM manipulation.', 2),
(1, 'Module 3: React Framework', 'Component lifecycle, Hooks, State management, and Routing.', 3);

-- Seed Steps for Module 1
INSERT INTO steps (module_id, title, resource_type, resource_url, estimated_minutes, order_index) VALUES
(1, 'HTML5 Semantic Tags & Elements', 'article', 'https://developer.mozilla.org/en-US/docs/Web/HTML', 30, 1),
(1, 'CSS Flexbox & Grid Layouts', 'video', 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', 45, 2),
(1, 'Responsive Web Design Principles', 'project', 'https://freecodecamp.org', 60, 3);

-- Seed Steps for Module 2
INSERT INTO steps (module_id, title, resource_type, resource_url, estimated_minutes, order_index) VALUES
(2, 'JS Data Types & Functions', 'article', 'https://javascript.info', 40, 1),
(2, 'Promises and Async/Await', 'video', 'https://javascript.info/async', 50, 2);

-- Seed Steps for Module 3
INSERT INTO steps (module_id, title, resource_type, resource_url, estimated_minutes, order_index) VALUES
(3, 'Introduction to React & JSX', 'article', 'https://react.dev', 30, 1),
(3, 'State & Hooks (useState, useEffect)', 'video', 'https://react.dev/reference/react', 60, 2);

-- Seed modules and steps for the additional learning paths
INSERT INTO modules (path_id, title, description, order_index) VALUES
(4, 'Module 1: Research & User Needs', 'Learn how to understand users before designing solutions.', 1),
(4, 'Module 2: Interface Design', 'Create accessible layouts, components, and visual systems.', 2),
(5, 'Module 1: Security Fundamentals', 'Understand common threats, vulnerabilities, and defensive thinking.', 1),
(5, 'Module 2: Networks & Identity', 'Build a practical foundation in secure networks and access control.', 2),
(6, 'Module 1: React Native Basics', 'Set up a mobile project and build your first screens.', 1),
(6, 'Module 2: App Data & Release', 'Connect APIs, manage state, and prepare an app for release.', 2),
(7, 'Module 1: Product Discovery', 'Frame customer problems and validate promising opportunities.', 1),
(7, 'Module 2: Planning & Delivery', 'Turn insights into an executable roadmap and measurable outcomes.', 2);

INSERT INTO steps (module_id, title, resource_type, resource_url, estimated_minutes, order_index) VALUES
(4, 'Write an effective user interview guide', 'article', 'https://www.nngroup.com/articles/user-interviews/', 35, 1),
(4, 'Map a customer journey', 'project', 'https://www.nngroup.com/articles/customer-journey-mapping/', 50, 2),
(5, 'Build a low-fidelity wireframe', 'project', 'https://help.figma.com/hc/en-us/articles/360040314193', 45, 1),
(5, 'Prototype a core user flow', 'video', 'https://help.figma.com/hc/en-us/articles/360040314193', 60, 2),
(6, 'Identify the OWASP Top 10', 'article', 'https://owasp.org/www-project-top-ten/', 45, 1),
(6, 'Practice threat modeling', 'project', 'https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool', 60, 2),
(7, 'Read a network request with browser tools', 'article', 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_web_server', 40, 1),
(7, 'Compare authentication and authorization', 'quiz', 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication', 35, 2),
(8, 'Create a React Native project', 'article', 'https://reactnative.dev/docs/environment-setup', 45, 1),
(8, 'Build a reusable mobile screen', 'project', 'https://reactnative.dev/docs/components-and-apis', 60, 2),
(9, 'Fetch data from an API', 'article', 'https://reactnative.dev/docs/network', 45, 1),
(9, 'Prepare a release checklist', 'project', 'https://reactnative.dev/docs/signed-apk-android', 50, 2),
(10, 'Define a problem statement', 'article', 'https://www.productplan.com/glossary/problem-statement/', 30, 1),
(10, 'Plan a lightweight user discovery sprint', 'project', 'https://www.productplan.com/glossary/product-discovery/', 50, 2),
(11, 'Prioritize a product backlog', 'article', 'https://www.atlassian.com/agile/product-management/prioritization-framework', 40, 1),
(11, 'Write an outcome-focused roadmap', 'project', 'https://www.atlassian.com/agile/product-management/product-roadmaps', 45, 2);
