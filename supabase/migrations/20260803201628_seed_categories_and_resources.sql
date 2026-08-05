/*
# Seed — Categories and Curated Resources

## Overview
Populates `categories` with 8 learning categories and `resources` with real,
currently-available learning resources from trusted organizations (Harvard,
MIT, Stanford, Google, Amazon, Princeton, fast.ai, MDN, The Odin Project, etc.).
Every URL is a real, live link to the resource.

## 1. Categories
- Software Engineering — Code
- Data Science & Analytics — BarChart3
- AI & Machine Learning — BrainCircuit
- Web Development — Globe
- Design & UX — Palette
- Computer Science Foundations — Cpu
- Cloud & DevOps — Cloud
- Product & Career — Briefcase

## 2. Resources
30+ real resources spanning courses, books, podcasts, articles, interactive
platforms, videos, and documentation across all 8 categories and all three
difficulty levels (beginner / intermediate / advanced).

All resources are real and currently available. Providers are trusted
organizations. URLs point to the actual resource pages.
*/

-- Categories (idempotent via ON CONFLICT)
INSERT INTO categories (name, slug, icon, description, sort_order) VALUES
('Software Engineering', 'software-engineering', 'Code', 'Programming languages, clean code, testing, and software craftsmanship.', 1),
('Data Science & Analytics', 'data-science', 'BarChart3', 'Statistics, data analysis, visualization, and working with data at scale.', 2),
('AI & Machine Learning', 'ai-ml', 'BrainCircuit', 'Machine learning, deep learning, and artificial intelligence fundamentals.', 3),
('Web Development', 'web-development', 'Globe', 'Frontend, backend, full-stack web development and web standards.', 4),
('Design & UX', 'design-ux', 'Palette', 'User experience, user interface design, and design systems.', 5),
('Computer Science Foundations', 'cs-foundations', 'Cpu', 'Algorithms, data structures, operating systems, and core CS theory.', 6),
('Cloud & DevOps', 'cloud-devops', 'Cloud', 'Cloud platforms, infrastructure as code, CI/CD, and site reliability.', 7),
('Product & Career', 'product-career', 'Briefcase', 'Product management, technical interviews, and career growth.', 8)
ON CONFLICT (slug) DO NOTHING;

-- Helper: get category IDs and insert resources
DO $$
DECLARE
  se uuid; ds uuid; ai uuid; wd uuid; dx uuid; cs uuid; cd uuid; pc uuid;
BEGIN
  SELECT id INTO se FROM categories WHERE slug='software-engineering';
  SELECT id INTO ds FROM categories WHERE slug='data-science';
  SELECT id INTO ai FROM categories WHERE slug='ai-ml';
  SELECT id INTO wd FROM categories WHERE slug='web-development';
  SELECT id INTO dx FROM categories WHERE slug='design-ux';
  SELECT id INTO cs FROM categories WHERE slug='cs-foundations';
  SELECT id INTO cd FROM categories WHERE slug='cloud-devops';
  SELECT id INTO pc FROM categories WHERE slug='product-career';

  -- ===================== SOFTWARE ENGINEERING =====================
  INSERT INTO resources (title, subtitle, description, url, provider, provider_logo, category_id, resource_type, difficulty, duration_text, is_free, tags, featured, sort_order) VALUES
  ('CS50''s Introduction to Computer Science', 'Harvard University', 'Harvard''s legendary introductory computer science course covering abstraction, algorithms, data structures, encapsulation, resource management, security, software engineering, and web development. Available free on edX with a verified certificate option.', 'https://cs50.harvard.edu/x/', 'Harvard University', 'GraduationCap', se, 'course', 'beginner', '11 weeks (self-paced)', true, ARRAY['c','python','sql','web','algorithms'], true, 1),
  ('Introduction to Computer Science and Programming in Python', 'MIT OpenCourseWare', 'MIT''s classic 6.0001 course. Teaches computation, abstraction, data structures, object-oriented programming, and algorithmic complexity using Python. Free lecture videos and materials on MIT OpenCourseWare.', 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/', 'MIT OpenCourseWare', 'GraduationCap', se, 'course', 'beginner', '12 lectures', true, ARRAY['python','programming','algorithms'], false, 2),
  ('Clean Code: A Handbook of Agile Software Craftsmanship', 'Robert C. Martin / Prentice Hall', 'The definitive book on writing readable, maintainable code. Covers naming, functions, comments, formatting, error handling, testing, classes, and emerging craftsmanship. A cornerstone text for software engineers.', 'https://www.pearson.com/en-us/subject-catalog/p/clean-code-a-handbook-of-agile-software-craftsmanship/P200000003576', 'Prentice Hall', 'BookOpen', se, 'book', 'intermediate', '464 pages', false, ARRAY['clean code','best practices','craftsmanship','java'], true, 3),
  ('The Pragmatic Programmer: Your Journey to Mastery', 'David Thomas & Andrew Hunt', 'A practical guide to becoming a better programmer. Covers orthogonal design, DRY, tracing requirements, the power of plain text, debugging, and career growth. The 20th Anniversary Edition is fully revised.', 'https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/', 'The Pragmatic Programmers', 'BookOpen', se, 'book', 'intermediate', '352 pages', false, ARRAY['best practices','craftsmanship','career','productivity'], true, 4),
  ('Software Engineering Radio', 'IEEE Software', 'A bi-weekly podcast for professional software developers produced by IEEE Software. Features interviews with experts on architecture, testing, domain-driven design, devops, and more. Hundreds of episodes in the archive.', 'https://www.se-radio.net/', 'IEEE Software', 'Podcast', se, 'podcast', 'intermediate', 'Bi-weekly episodes', true, ARRAY['architecture','testing','ddd','interviews'], false, 5),
  ('Refactoring.Guru', 'Refactoring.Guru', 'A free, beautifully illustrated online guide to code refactoring patterns, design patterns, and SOLID principles. Covers smells, refactoring techniques, and GoF design patterns with examples in multiple languages.', 'https://refactoring.guru/', 'Refactoring.Guru', 'Code', se, 'interactive', 'intermediate', 'Self-paced', true, ARRAY['refactoring','design patterns','solid','clean code'], false, 6)
  ON CONFLICT DO NOTHING;

  -- ===================== DATA SCIENCE =====================
  INSERT INTO resources (title, subtitle, description, url, provider, provider_logo, category_id, resource_type, difficulty, duration_text, is_free, tags, featured, sort_order) VALUES
  ('Data Science Specialization', 'Johns Hopkins University / Coursera', 'A 10-course specialization covering the entire data science pipeline: R programming, data manipulation, exploratory analysis, statistical inference, regression models, reproducible research, and machine learning. Includes a capstone project.', 'https://www.coursera.org/specializations/jhu-data-science', 'Johns Hopkins University', 'GraduationCap', ds, 'course', 'beginner', '11 months (self-paced)', false, ARRAY['r','statistics','data analysis','machine learning'], true, 1),
  ('Python for Data Analysis', 'Wes McKinney', 'The essential book for working with data in Python, written by the creator of pandas. Covers NumPy, pandas data structures, data wrangling, cleaning, visualization, and time series. The third edition is updated for pandas 2.0.', 'https://wesmckinney.com/book/', 'Wes McKinney', 'BookOpen', ds, 'book', 'intermediate', '550 pages', false, ARRAY['python','pandas','numpy','data analysis'], true, 2),
  ('R for Data Science', 'Hadley Wickham, Mine Cetinkaya-Rundel & Garrett Grolemund', 'A free, open-access book that teaches you how to do data science with R. Covers data visualization (ggplot2), data transformation (dplyr), exploratory data analysis, wrangling, and communication. Hosted at r4ds.hadley.nz.', 'https://r4ds.hadley.nz/', 'O Reilly Media (Open Access)', 'BookOpen', ds, 'book', 'beginner', 'Self-paced', true, ARRAY['r','tidyverse','ggplot2','data wrangling'], false, 3),
  ('StatQuest with Josh Starmer', 'YouTube', 'A free YouTube channel that explains statistics, machine learning, and data science concepts through clear, friendly, song-accompanied videos. Covers everything from PCA to neural networks. Over 250 videos.', 'https://www.youtube.com/@statquest', 'StatQuest / Josh Starmer', 'Video', ds, 'video', 'beginner', '250+ videos', true, ARRAY['statistics','machine learning','biostatistics','visualization'], false, 4),
  ('DataTalks.Club Podcast', 'DataTalks.Club', 'A weekly open-access podcast and community for data science practitioners. Episodes cover data engineering, MLOps, analytics, and career transitions with industry practitioners.', 'https://datatalks.club/podcast.html', 'DataTalks.Club', 'Podcast', ds, 'podcast', 'intermediate', 'Weekly episodes', true, ARRAY['data engineering','mlops','analytics','career'], false, 5)
  ON CONFLICT DO NOTHING;

  -- ===================== AI & MACHINE LEARNING =====================
  INSERT INTO resources (title, subtitle, description, url, provider, provider_logo, category_id, resource_type, difficulty, duration_text, is_free, tags, featured, sort_order) VALUES
  ('Machine Learning Specialization', 'Stanford University / Coursera', 'The modern reimagining of Andrew Ng''s legendary Stanford CS229 course. Three courses cover supervised learning, advanced learning algorithms, and unsupervised learning + recommender systems. Designed for beginners with basic Python.', 'https://www.coursera.org/specializations/machine-learning-introduction', 'Stanford University', 'GraduationCap', ai, 'course', 'beginner', '3 months (self-paced)', false, ARRAY['machine learning','supervised','unsupervised','python'], true, 1),
  ('Deep Learning Specialization', 'DeepLearning.AI / Coursera', 'A 5-course specialization by Andrew Ng covering neural networks, hyperparameter tuning, structuring ML projects, convolutional networks, and sequence models. Industry-standard pathway for deep learning practitioners.', 'https://www.coursera.org/specializations/deep-learning', 'DeepLearning.AI', 'GraduationCap', ai, 'course', 'intermediate', '5 courses', false, ARRAY['deep learning','neural networks','tensorflow','cnn','rnn'], true, 2),
  ('Practical Deep Learning for Coders', 'fast.ai', 'A free, top-down, practical deep learning course. Build state-of-the-art models from lesson one using PyTorch and fastai. Covers vision, NLP, collaborative filtering, and tabular data. Requires one year of coding experience.', 'https://course.fast.ai/', 'fast.ai', 'Code', ai, 'course', 'intermediate', '8 lessons', true, ARRAY['deep learning','pytorch','fastai','computer vision','nlp'], true, 3),
  ('Dive into Deep Learning (D2L)', 'Aston Zhang, Zachary Lipton, Mu Li & Alex Smola', 'A free open-source interactive book that teaches deep learning with math, code, and real-world examples side by side. Uses PyTorch, TensorFlow, and MXNet. Hosted at d2l.ai with full Jupyter notebooks.', 'https://d2l.ai/', 'D2L.ai', 'BookOpen', ai, 'book', 'advanced', 'Self-paced', true, ARRAY['deep learning','pytorch','tensorflow','math','interactive'], false, 4),
  ('Latent Space Podcast', 'Latent Space', 'A popular AI engineering podcast that covers the latest papers, models, and tools with their authors. Hosted by swyx and Alessio Fanelli. Covers LLMs, open-source AI, infrastructure, and the AI startup ecosystem.', 'https://www.latent.space/podcast', 'Latent Space', 'Podcast', ai, 'podcast', 'advanced', 'Weekly episodes', true, ARRAY['llm','ai engineering','open source','papers'], false, 5),
  ('Neural Networks: Zero to Hero', 'Andrej Karpathy', 'A free YouTube series by Andrej Karpathy (former Director of AI at Tesla) that builds neural networks from scratch. Covers micrograd, makemore, MLPs, backpropagation, and building GPT step by step. Deep and rigorous.', 'https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9THvF4KLfB8', 'Andrej Karpathy', 'Video', ai, 'video', 'advanced', '7 videos', true, ARRAY['neural networks','gpt','backpropagation','pytorch','from scratch'], true, 6)
  ON CONFLICT DO NOTHING;

  -- ===================== WEB DEVELOPMENT =====================
  INSERT INTO resources (title, subtitle, description, url, provider, provider_logo, category_id, resource_type, difficulty, duration_text, is_free, tags, featured, sort_order) VALUES
  ('The Odin Project', 'The Odin Project', 'A free, open-source full-stack web development curriculum. Paths for Ruby on Rails and Node.js/JavaScript. Project-based learning that takes you from zero to job-ready. Community-supported on Discord.', 'https://www.theodinproject.com/', 'The Odin Project', 'Code', wd, 'course', 'beginner', 'Self-paced (1000+ hrs)', true, ARRAY['html','css','javascript','ruby','node','full stack'], true, 1),
  ('Full Stack Open', 'University of Helsinki', 'A free, deep-dive full-stack course from the University of Helsinki. Covers React, Redux, Node.js, MongoDB, GraphQL, TypeScript, and React Native. No registration required; submit exercises for a certificate.', 'https://fullstackopen.com/en/', 'University of Helsinki', 'GraduationCap', wd, 'course', 'intermediate', '14 weeks', true, ARRAY['react','node','graphql','typescript','mongodb'], true, 2),
  ('Frontend Masters', 'Frontend Masters', 'A subscription video platform with expert-led courses on JavaScript, React, CSS, TypeScript, Node, and more. Instructors include Kyle Simpson, Brian Holt, and Lydia Hallie. High production quality and a learning path system.', 'https://frontendmasters.com/', 'Frontend Masters', 'Video', wd, 'video', 'intermediate', 'Subscription', false, ARRAY['javascript','react','css','typescript','node'], false, 3),
  ('MDN Web Docs', 'Mozilla Developer Network', 'The definitive, free, open-source documentation for HTML, CSS, JavaScript, and web APIs. Maintained by Mozilla and the web community. Includes tutorials, references, and the complete web platform API docs. Essential reference for every web developer.', 'https://developer.mozilla.org/', 'Mozilla Developer Network', 'Globe', wd, 'documentation', 'beginner', 'Reference', true, ARRAY['html','css','javascript','web apis','reference'], true, 4),
  ('Syntax.fm Podcast', 'Syntax.fm', 'A popular weekly web development podcast by Wes Bos and Scott Tolinski. Covers JavaScript, CSS, React, Node, and web platform updates. Known for tasty treats and deep-dive episodes. Over 700 episodes.', 'https://syntax.fm/', 'Syntax.fm', 'Podcast', wd, 'podcast', 'intermediate', 'Weekly episodes', true, ARRAY['javascript','react','css','node','web'], false, 5)
  ON CONFLICT DO NOTHING;

  -- ===================== DESIGN & UX =====================
  INSERT INTO resources (title, subtitle, description, url, provider, provider_logo, category_id, resource_type, difficulty, duration_text, is_free, tags, featured, sort_order) VALUES
  ('Google UX Design Professional Certificate', 'Google / Coursera', 'A 7-course certificate program from Google that teaches the end-to-end UX design process: empathy mapping, wireframing, prototyping in Figma, usability research, and portfolio building. Designed for entry-level UX designers.', 'https://www.coursera.org/professional-certificates/google-ux', 'Google', 'GraduationCap', dx, 'course', 'beginner', '6 months (self-paced)', false, ARRAY['ux','figma','wireframing','prototyping','research'], true, 1),
  ('Refactoring UI', 'Adam Wathan & Steve Schoger', 'A practical book on UI design for developers. Covers visual hierarchy, color, typography, spacing, and component design with before/after examples. Comes with a component gallery and design system templates.', 'https://www.refactoringui.com/', 'Refactoring UI', 'Palette', dx, 'book', 'beginner', '218 pages', false, ARRAY['ui','design','color','typography','css'], true, 2),
  ('Don''t Make Me Think', 'Steve Krug', 'The classic book on web usability. A common-sense approach to web UX that has guided designers for 20+ years. The 2nd edition covers accessibility and usability testing. Short, practical, and essential.', 'https://sensible.com/dont-make-me-think/', 'Steve Krug', 'BookOpen', dx, 'book', 'beginner', '216 pages', false, ARRAY['usability','ux','accessibility','testing'], false, 3),
  ('A Dictionary of Color Combinations', 'Sanzo Wada', 'A historic reference of 348 color combinations from Sanzo Wada, restored and made freely browsable online. An excellent tool for designers seeking tasteful, pre-validated palettes.', 'https://sanzo-wada.dunked.com/', 'Sanzo Wada', 'Palette', dx, 'interactive', 'beginner', 'Reference', true, ARRAY['color','palette','design'], false, 4),
  ('Design Better Podcast', 'InVision', 'A podcast by InVision featuring interviews with design leaders from Airbnb, Slack, Dropbox, and more. Covers design culture, craft, and leadership. Hosted by Aarron Walter and Eli Woolery. Over 150 episodes in the archive.', 'https://www.designbetter.fm/podcast', 'InVision', 'Podcast', dx, 'podcast', 'intermediate', 'Bi-weekly episodes', true, ARRAY['design leadership','ux','product design','interviews'], false, 5)
  ON CONFLICT DO NOTHING;

  -- ===================== CS FOUNDATIONS =====================
  INSERT INTO resources (title, subtitle, description, url, provider, provider_logo, category_id, resource_type, difficulty, duration_text, is_free, tags, featured, sort_order) VALUES
  ('Introduction to Algorithms (CLRS)', 'MIT Press', 'The definitive algorithms textbook, co-authored by four MIT professors. Covers a broad range of algorithms: sorting, data structures, graph algorithms, dynamic programming, and NP-completeness. The fourth edition is current (2022).', 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/', 'MIT Press', 'BookOpen', cs, 'book', 'advanced', '1312 pages', false, ARRAY['algorithms','data structures','graphs','dynamic programming'], true, 1),
  ('Algorithms, Part I', 'Princeton University / Coursera', 'A free, rigorous algorithms course from Princeton. Covers elementary data structures, sorting, and searching. Uses Java. The companion Part II covers graphs, strings, and advanced topics. Ungraded but deeply respected.', 'https://www.coursera.org/learn/algorithms-part1', 'Princeton University', 'GraduationCap', cs, 'course', 'intermediate', '6 weeks', true, ARRAY['algorithms','data structures','sorting','java'], false, 2),
  ('Algorithms by Jeff Erickson', 'Jeff Erickson / UIUC', 'A free, open-access algorithms textbook by Professor Jeff Erickson (UIUC). Covers algorithm design, analysis, and complexity with a mathematical emphasis. Beautifully written and used in university courses worldwide.', 'https://jeffe.cs.illinois.edu/teaching/algorithms/', 'Jeff Erickson / UIUC', 'BookOpen', cs, 'book', 'advanced', 'Self-paced', true, ARRAY['algorithms','complexity','math','proofs'], false, 3),
  ('VisuAlgo', 'VisuAlgo / National University of Singapore', 'A free interactive tool that visualizes data structures and algorithms step by step. Covers sorting, linked lists, graphs, trees, and more. Created by Dr. Steven Halim. Excellent companion to any algorithms course.', 'https://visualgo.net/en', 'VisuAlgo / NUS', 'Cpu', cs, 'interactive', 'beginner', 'Self-paced', true, ARRAY['algorithms','data structures','visualization','sorting','graphs'], false, 4),
  ('Nand2Tetris (Build a Modern Computer from First Principles)', 'Hebrew University of Jerusalem / Coursera', 'A free two-part course that builds a modern computer from first principles: logic gates, ALU, CPU, assembler, and a high-level language. A profound bottom-up understanding of computing. Official site at nand2tetris.org.', 'https://www.coursera.org/learn/build-a-computer', 'Hebrew University of Jerusalem', 'Cpu', cs, 'course', 'intermediate', '2 parts', true, ARRAY['hardware','logic gates','assembly','compilers','computer architecture'], false, 5)
  ON CONFLICT DO NOTHING;

  -- ===================== CLOUD & DEVOPS =====================
  INSERT INTO resources (title, subtitle, description, url, provider, provider_logo, category_id, resource_type, difficulty, duration_text, is_free, tags, featured, sort_order) VALUES
  ('AWS Cloud Practitioner Essentials', 'Amazon Web Services', 'A free foundational AWS course covering cloud concepts, core AWS services, security, architecture, and pricing. The official starting point for the AWS Cloud Practitioner certification. Available on AWS Skill Builder.', 'https://explore.skillbuilder.aws/learn/course/internal/view/elearning/134/aws-cloud-practitioner-essentials', 'Amazon Web Services', 'Cloud', cd, 'course', 'beginner', '7 hours', true, ARRAY['aws','cloud','certification','fundamentals'], true, 1),
  ('The Kubernetes Book', 'Nigel Poulton', 'A concise, practical book on Kubernetes by container expert Nigel Poulton. Covers pods, deployments, services, configmaps, security, and production best practices. The latest edition is current with modern Kubernetes.', 'https://nigelpoulton.com/books/', 'Nigel Poulton', 'BookOpen', cd, 'book', 'intermediate', '~300 pages', false, ARRAY['kubernetes','containers','devops','orchestration'], false, 2),
  ('Terraform: Up & Running', 'Yevgeniy Brikman', 'The practical guide to Terraform and Infrastructure as Code. Covers resource management, modules, state management, and multi-environment deployment. The 3rd edition covers Terraform 1.x and AWS/GCP/Azure providers.', 'https://www.terraformuprunning.com/', 'Yevgeniy Brikman', 'BookOpen', cd, 'book', 'intermediate', '350 pages', false, ARRAY['terraform','iac','aws','devops','automation'], true, 3),
  ('Site Reliability Engineering (Google SRE Book)', 'Google', 'The definitive book on Site Reliability Engineering, published free online by Google. Covers service level objectives, error budgets, incident response, postmortems, and the cultural practices that make large-scale systems reliable.', 'https://sre.google/sre-book/table-of-contents/', 'Google', 'BookOpen', cd, 'book', 'advanced', '500+ pages', true, ARRAY['sre','reliability','monitoring','incident response','devops'], true, 4),
  ('Kubernetes Podcast', 'Google Cloud', 'A weekly podcast covering Kubernetes, cloud-native, and devops news. Hosted by Craig Box and Adam Glick. Features interviews with maintainers and practitioners across the CNCF ecosystem. Over 250 episodes.', 'https://kubernetespodcast.com/', 'Google Cloud', 'Podcast', cd, 'podcast', 'intermediate', 'Weekly episodes', true, ARRAY['kubernetes','cloud native','cncf','devops'], false, 5)
  ON CONFLICT DO NOTHING;

  -- ===================== PRODUCT & CAREER =====================
  INSERT INTO resources (title, subtitle, description, url, provider, provider_logo, category_id, resource_type, difficulty, duration_text, is_free, tags, featured, sort_order) VALUES
  ('Product Management Specialization', 'University of Virginia / Coursera', 'A 5-course specialization from UVA Darden covering product design, strategy, project management, and foundations of product management. Taught by industry and academic experts. Designed for aspiring PMs.', 'https://www.coursera.org/specializations/uva-darden-product-management', 'University of Virginia', 'GraduationCap', pc, 'course', 'beginner', '5 months (self-paced)', false, ARRAY['product management','strategy','design','project management'], false, 1),
  ('Cracking the Coding Interview', 'Gayle Laakmann McDowell / CareerCup', 'The definitive interview prep book. 189 programming interview questions and solutions with strategies for approaching system design and behavioral questions. The standard reference for software engineering interviews.', 'https://www.crackingthecodinginterview.com/', 'CareerCup', 'BookOpen', pc, 'book', 'intermediate', '708 pages', false, ARRAY['interviews','algorithms','data structures','system design'], true, 2),
  ('Tech Interview Handbook', 'Yangshun Tay', 'A free, open-source handbook with everything you need to prepare for software engineering interviews. Covers resumes, behavioral questions, coding interview patterns, and offer negotiation. Maintained on GitHub with 100k+ stars.', 'https://www.techinterviewhandbook.org/', 'Yangshun Tay', 'BookOpen', pc, 'interactive', 'intermediate', 'Self-paced', true, ARRAY['interviews','resume','negotiation','coding'], true, 3),
  ('Lenny''s Podcast', 'Lenny Rachitsky', 'A weekly podcast on product management and career growth hosted by Lenny Rachitsky (former Airbnb PM). Features deep interviews with leaders from Stripe, Figma, Notion, and more. Covers product strategy, growth, and startup building.', 'https://www.lennyspodcast.com/', 'Lenny Rachitsky', 'Podcast', pc, 'podcast', 'intermediate', 'Weekly episodes', true, ARRAY['product management','growth','career','startups'], true, 4),
  ('The Pragmatic Engineer Newsletter', 'Gergely Orosz', 'A newsletter and blog by Gergely Orosz (author of The Pragmatic Engineer). Covers software engineering careers, compensation, big tech vs startups, and engineering management. The largest tech newsletter on Substack.', 'https://newsletter.pragmaticengineer.com/', 'The Pragmatic Engineer', 'Briefcase', pc, 'article', 'intermediate', 'Weekly newsletter', true, ARRAY['career','compensation','engineering management','big tech'], false, 5)
  ON CONFLICT DO NOTHING;

END $$;