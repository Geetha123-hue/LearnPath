-- Idempotent content migration for databases created before the expanded seed.
INSERT INTO learning_paths (title, description, category, difficulty, estimated_hours, cover_image, creator_id)
SELECT 'UI/UX Product Design', 'Turn user needs into clear interfaces, clickable prototypes, and thoughtful product experiences.', 'Design', 'Beginner', 24, 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600', id
FROM users WHERE username = 'admin' AND NOT EXISTS (SELECT 1 FROM learning_paths WHERE title = 'UI/UX Product Design');

INSERT INTO learning_paths (title, description, category, difficulty, estimated_hours, cover_image, creator_id)
SELECT 'Cybersecurity Foundations', 'Build practical security habits while learning networks, threats, identity, and incident response.', 'Cybersecurity', 'Intermediate', 30, 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600', id
FROM users WHERE username = 'admin' AND NOT EXISTS (SELECT 1 FROM learning_paths WHERE title = 'Cybersecurity Foundations');

INSERT INTO learning_paths (title, description, category, difficulty, estimated_hours, cover_image, creator_id)
SELECT 'Mobile App Development with React Native', 'Create polished cross-platform mobile apps with React Native, navigation, and API data.', 'Mobile Development', 'Intermediate', 32, 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600', id
FROM users WHERE username = 'admin' AND NOT EXISTS (SELECT 1 FROM learning_paths WHERE title = 'Mobile App Development with React Native');

INSERT INTO learning_paths (title, description, category, difficulty, estimated_hours, cover_image, creator_id)
SELECT 'Product Management Essentials', 'Learn to discover valuable problems, prioritize the roadmap, and ship products users need.', 'Product', 'Beginner', 18, 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600', id
FROM users WHERE username = 'admin' AND NOT EXISTS (SELECT 1 FROM learning_paths WHERE title = 'Product Management Essentials');

INSERT INTO modules (path_id, title, description, order_index)
SELECT id, 'Module 1: Research & User Needs', 'Learn how to understand users before designing solutions.', 1 FROM learning_paths p
WHERE p.title = 'UI/UX Product Design' AND NOT EXISTS (SELECT 1 FROM modules WHERE path_id = p.id AND order_index = 1);
INSERT INTO modules (path_id, title, description, order_index)
SELECT id, 'Module 2: Interface Design', 'Create accessible layouts, components, and visual systems.', 2 FROM learning_paths p
WHERE p.title = 'UI/UX Product Design' AND NOT EXISTS (SELECT 1 FROM modules WHERE path_id = p.id AND order_index = 2);

INSERT INTO modules (path_id, title, description, order_index)
SELECT id, 'Module 1: Security Fundamentals', 'Understand common threats, vulnerabilities, and defensive thinking.', 1 FROM learning_paths p
WHERE p.title = 'Cybersecurity Foundations' AND NOT EXISTS (SELECT 1 FROM modules WHERE path_id = p.id AND order_index = 1);
INSERT INTO modules (path_id, title, description, order_index)
SELECT id, 'Module 2: Networks & Identity', 'Build a practical foundation in secure networks and access control.', 2 FROM learning_paths p
WHERE p.title = 'Cybersecurity Foundations' AND NOT EXISTS (SELECT 1 FROM modules WHERE path_id = p.id AND order_index = 2);

INSERT INTO modules (path_id, title, description, order_index)
SELECT id, 'Module 1: React Native Basics', 'Set up a mobile project and build your first screens.', 1 FROM learning_paths p
WHERE p.title = 'Mobile App Development with React Native' AND NOT EXISTS (SELECT 1 FROM modules WHERE path_id = p.id AND order_index = 1);
INSERT INTO modules (path_id, title, description, order_index)
SELECT id, 'Module 2: App Data & Release', 'Connect APIs, manage state, and prepare an app for release.', 2 FROM learning_paths p
WHERE p.title = 'Mobile App Development with React Native' AND NOT EXISTS (SELECT 1 FROM modules WHERE path_id = p.id AND order_index = 2);

INSERT INTO modules (path_id, title, description, order_index)
SELECT id, 'Module 1: Product Discovery', 'Frame customer problems and validate promising opportunities.', 1 FROM learning_paths p
WHERE p.title = 'Product Management Essentials' AND NOT EXISTS (SELECT 1 FROM modules WHERE path_id = p.id AND order_index = 1);
INSERT INTO modules (path_id, title, description, order_index)
SELECT id, 'Module 2: Planning & Delivery', 'Turn insights into an executable roadmap and measurable outcomes.', 2 FROM learning_paths p
WHERE p.title = 'Product Management Essentials' AND NOT EXISTS (SELECT 1 FROM modules WHERE path_id = p.id AND order_index = 2);

INSERT INTO steps (module_id, title, resource_type, resource_url, estimated_minutes, order_index)
SELECT m.id, 'Write an effective user interview guide', 'article', 'https://www.nngroup.com/articles/user-interviews/', 35, 1 FROM modules m
WHERE m.title = 'Module 1: Research & User Needs' AND NOT EXISTS (SELECT 1 FROM steps WHERE module_id = m.id AND order_index = 1);
INSERT INTO steps (module_id, title, resource_type, resource_url, estimated_minutes, order_index)
SELECT m.id, 'Map a customer journey', 'project', 'https://www.nngroup.com/articles/customer-journey-mapping/', 50, 2 FROM modules m
WHERE m.title = 'Module 1: Research & User Needs' AND NOT EXISTS (SELECT 1 FROM steps WHERE module_id = m.id AND order_index = 2);
INSERT INTO steps (module_id, title, resource_type, resource_url, estimated_minutes, order_index)
SELECT m.id, 'Build a low-fidelity wireframe', 'project', 'https://help.figma.com/hc/en-us/articles/360040314193', 45, 1 FROM modules m
WHERE m.title = 'Module 2: Interface Design' AND NOT EXISTS (SELECT 1 FROM steps WHERE module_id = m.id AND order_index = 1);
INSERT INTO steps (module_id, title, resource_type, resource_url, estimated_minutes, order_index)
SELECT m.id, 'Prototype a core user flow', 'video', 'https://help.figma.com/hc/en-us/articles/360040314193', 60, 2 FROM modules m
WHERE m.title = 'Module 2: Interface Design' AND NOT EXISTS (SELECT 1 FROM steps WHERE module_id = m.id AND order_index = 2);

INSERT INTO steps (module_id, title, resource_type, resource_url, estimated_minutes, order_index)
SELECT m.id, 'Identify the OWASP Top 10', 'article', 'https://owasp.org/www-project-top-ten/', 45, 1 FROM modules m
WHERE m.title = 'Module 1: Security Fundamentals' AND NOT EXISTS (SELECT 1 FROM steps WHERE module_id = m.id AND order_index = 1);
INSERT INTO steps (module_id, title, resource_type, resource_url, estimated_minutes, order_index)
SELECT m.id, 'Practice threat modeling', 'project', 'https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool', 60, 2 FROM modules m
WHERE m.title = 'Module 1: Security Fundamentals' AND NOT EXISTS (SELECT 1 FROM steps WHERE module_id = m.id AND order_index = 2);
INSERT INTO steps (module_id, title, resource_type, resource_url, estimated_minutes, order_index)
SELECT m.id, 'Read a network request with browser tools', 'article', 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_web_server', 40, 1 FROM modules m
WHERE m.title = 'Module 2: Networks & Identity' AND NOT EXISTS (SELECT 1 FROM steps WHERE module_id = m.id AND order_index = 1);
INSERT INTO steps (module_id, title, resource_type, resource_url, estimated_minutes, order_index)
SELECT m.id, 'Compare authentication and authorization', 'quiz', 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication', 35, 2 FROM modules m
WHERE m.title = 'Module 2: Networks & Identity' AND NOT EXISTS (SELECT 1 FROM steps WHERE module_id = m.id AND order_index = 2);

INSERT INTO steps (module_id, title, resource_type, resource_url, estimated_minutes, order_index)
SELECT m.id, 'Create a React Native project', 'article', 'https://reactnative.dev/docs/environment-setup', 45, 1 FROM modules m
WHERE m.title = 'Module 1: React Native Basics' AND NOT EXISTS (SELECT 1 FROM steps WHERE module_id = m.id AND order_index = 1);
INSERT INTO steps (module_id, title, resource_type, resource_url, estimated_minutes, order_index)
SELECT m.id, 'Build a reusable mobile screen', 'project', 'https://reactnative.dev/docs/components-and-apis', 60, 2 FROM modules m
WHERE m.title = 'Module 1: React Native Basics' AND NOT EXISTS (SELECT 1 FROM steps WHERE module_id = m.id AND order_index = 2);
INSERT INTO steps (module_id, title, resource_type, resource_url, estimated_minutes, order_index)
SELECT m.id, 'Fetch data from an API', 'article', 'https://reactnative.dev/docs/network', 45, 1 FROM modules m
WHERE m.title = 'Module 2: App Data & Release' AND NOT EXISTS (SELECT 1 FROM steps WHERE module_id = m.id AND order_index = 1);
INSERT INTO steps (module_id, title, resource_type, resource_url, estimated_minutes, order_index)
SELECT m.id, 'Prepare a release checklist', 'project', 'https://reactnative.dev/docs/signed-apk-android', 50, 2 FROM modules m
WHERE m.title = 'Module 2: App Data & Release' AND NOT EXISTS (SELECT 1 FROM steps WHERE module_id = m.id AND order_index = 2);

INSERT INTO steps (module_id, title, resource_type, resource_url, estimated_minutes, order_index)
SELECT m.id, 'Define a problem statement', 'article', 'https://www.productplan.com/glossary/problem-statement/', 30, 1 FROM modules m
WHERE m.title = 'Module 1: Product Discovery' AND NOT EXISTS (SELECT 1 FROM steps WHERE module_id = m.id AND order_index = 1);
INSERT INTO steps (module_id, title, resource_type, resource_url, estimated_minutes, order_index)
SELECT m.id, 'Plan a lightweight user discovery sprint', 'project', 'https://www.productplan.com/glossary/product-discovery/', 50, 2 FROM modules m
WHERE m.title = 'Module 1: Product Discovery' AND NOT EXISTS (SELECT 1 FROM steps WHERE module_id = m.id AND order_index = 2);
INSERT INTO steps (module_id, title, resource_type, resource_url, estimated_minutes, order_index)
SELECT m.id, 'Prioritize a product backlog', 'article', 'https://www.atlassian.com/agile/product-management/prioritization-framework', 40, 1 FROM modules m
WHERE m.title = 'Module 2: Planning & Delivery' AND NOT EXISTS (SELECT 1 FROM steps WHERE module_id = m.id AND order_index = 1);
INSERT INTO steps (module_id, title, resource_type, resource_url, estimated_minutes, order_index)
SELECT m.id, 'Write an outcome-focused roadmap', 'project', 'https://www.atlassian.com/agile/product-management/product-roadmaps', 45, 2 FROM modules m
WHERE m.title = 'Module 2: Planning & Delivery' AND NOT EXISTS (SELECT 1 FROM steps WHERE module_id = m.id AND order_index = 2);