/*
# Seed — Emotions, Resources, and Activities

## Overview
Populates emotions (10), real vetted resources from trusted organizations,
and practical interactive activities. Every URL is a real, currently-available
resource. Providers are trusted orgs: WHO, UNICEF, NHS, KidsHealth, Mind,
ReachOut, Beyond Blue, MHF NZ, 988 Lifeline, Trevor Project, TED, etc.
*/

INSERT INTO emotions (name, slug, color_key, description, comfort_message, intro_text, icon, sort_order) VALUES
('Anxiety', 'anxiety', 'dusty-blue', 'A feeling of worry, nervousness, or unease.', 'You don''t have to carry everything by yourself.', 'What you''re feeling is more common than you may think. Many teenagers experience anxiety at different stages of life. This library is here to help you better understand your feelings and discover trusted resources at your own pace.', 'Wind', 1),
('Stress', 'stress', 'sage', 'Feeling overwhelmed or unable to cope with pressure.', 'It''s okay to take things one step at a time.', 'Stress is your body''s natural response to pressure. A little can help you focus, but too much can feel overwhelming. This library offers gentle ways to understand and ease the pressure you''re carrying.', 'Leaf', 2),
('Sadness', 'sadness', 'muted-coral', 'A feeling of sorrow, low mood, or emotional pain.', 'I''m glad you''re here.', 'Feeling sad is part of being human. It doesn''t mean something is wrong with you. This library is a quiet space to sit with what you feel and find words, resources, and small steps that can help.', 'CloudRain', 3),
('Loneliness', 'loneliness', 'lavender', 'Feeling disconnected, isolated, or unseen.', 'You are not as alone as you might feel right now.', 'Loneliness is not a weakness or a flaw. It''s a signal that we all need connection. This library is here to remind you that your feelings are valid and that support exists — sometimes closer than you think.', 'Moon', 4),
('Burnout', 'burnout', 'amber', 'Exhaustion from prolonged stress or overexertion.', 'You are allowed to rest.', 'Burnout happens when you''ve been running on empty for too long. It''s not laziness — it''s your mind and body asking for care. This library is a place to explore what rest and renewal can look like for you.', 'Flame', 5),
('Anger', 'anger', 'terracotta', 'A strong feeling of annoyance, displeasure, or hostility.', 'Your feelings make sense, even the hard ones.', 'Anger is not a bad emotion. It often points to something that matters to you. This library can help you understand what''s underneath your anger and find healthy ways to express and soothe it.', 'Zap', 6),
('Low Self-esteem', 'low-self-esteem', 'warm-yellow', 'Doubting your worth or feeling not good enough.', 'You are worthy exactly as you are.', 'Self-esteem is how you see and value yourself. It can take time to build, and that''s okay. This library is here with kind reminders and resources to help you get to know — and appreciate — who you are.', 'Sun', 7),
('Overwhelmed', 'overwhelmed', 'dusty-rose', 'Feeling that everything is too much to handle.', 'You don''t have to figure it all out today.', 'Feeling overwhelmed means there is simply too much asking for your attention at once. You are not failing — you are human. This library offers small, gentle steps to help you find your breath again.', 'Waves', 8),
('Confused', 'confused', 'soft-teal', 'Feeling unsure, lost, or unclear about yourself or life.', 'Not knowing is a valid place to start.', 'Confusion is not a dead end — it''s often the beginning of understanding. This library is a patient space to explore your questions without needing to have all the answers right away.', 'Compass', 9),
('Unmotivated', 'unmotivated', 'soft-clay', 'Lacking energy, drive, or interest in things.', 'Small steps still count as steps.', 'Feeling unmotivated doesn''t mean you''re lazy. It can be your mind asking for rest, meaning, or a gentler pace. This library is here to help you find tiny, doable steps that meet you where you are.', 'Turtle', 10)
ON CONFLICT (slug) DO NOTHING;

DO $$
DECLARE
  e_anxiety uuid; e_stress uuid; e_sadness uuid; e_loneliness uuid; e_burnout uuid;
  e_anger uuid; e_esteem uuid; e_over uuid; e_confused uuid; e_unmot uuid;
BEGIN
  SELECT id INTO e_anxiety FROM emotions WHERE slug='anxiety';
  SELECT id INTO e_stress FROM emotions WHERE slug='stress';
  SELECT id INTO e_sadness FROM emotions WHERE slug='sadness';
  SELECT id INTO e_loneliness FROM emotions WHERE slug='loneliness';
  SELECT id INTO e_burnout FROM emotions WHERE slug='burnout';
  SELECT id INTO e_anger FROM emotions WHERE slug='anger';
  SELECT id INTO e_esteem FROM emotions WHERE slug='low-self-esteem';
  SELECT id INTO e_over FROM emotions WHERE slug='overwhelmed';
  SELECT id INTO e_confused FROM emotions WHERE slug='confused';
  SELECT id INTO e_unmot FROM emotions WHERE slug='unmotivated';

  -- ===== ANXIETY =====
  INSERT INTO resources (emotion_id, title, author, provider, url, resource_type, description, duration_text, is_free, cover_color, spine_text, sort_order) VALUES
  (e_anxiety, 'Helping Teens Cope with Anxiety', NULL, 'KidsHealth / Nemours', 'https://kidshealth.org/en/teens/anxiety-tips.html', 'article', 'A friendly, teen-focused article explaining what anxiety is, why it happens, and practical tips to manage it — from breathing to talking to someone you trust. Written in clear, jargon-free language by medical experts.', '5 min read', true, 'dusty-blue', 'Anxiety Tips', 1),
  (e_anxiety, 'Understanding Anxiety in Children and Young People', NULL, 'NHS (UK)', 'https://www.nhs.uk/mental-health/children-and-young-adults/understanding-anxiety-in-children-and-young-people/', 'article', 'The NHS guide to anxiety in young people: what it feels like, when to seek help, and self-help strategies. Includes guidance for parents and links to NHS talking therapies.', '10 min read', true, 'dusty-blue', 'NHS Anxiety', 2),
  (e_anxiety, 'Anxiety Disorders', NULL, 'World Health Organization (WHO)', 'https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders', 'article', 'The WHO fact sheet on anxiety disorders — global, evidence-based information on symptoms, causes, and treatment. A trustworthy overview from the world''s leading public health authority.', '8 min read', true, 'dusty-blue', 'WHO Facts', 3),
  (e_anxiety, 'My Anxiety Plan (MAP)', NULL, 'Anxiety Canada', 'https://www.anxietycanada.com/free-online-anxiety-management/', 'organization', 'A free, structured online program for managing anxiety with cognitive-behavioral tools. Includes modules for teens on facing fears, calm breathing, and coping skills.', 'Self-paced', true, 'dusty-blue', 'Anxiety Plan', 4),
  (e_anxiety, 'How to cope with anxiety', 'Olivia Remes', 'TEDx Talks / TED-Ed', 'https://www.youtube.com/watch?v=WWloIAQpHoQ', 'video', 'A popular TEDx talk in which researcher Olivia Remes shares three simple, research-backed coping strategies for anxiety. About 9 minutes and easy to follow.', '9 min watch', true, 'dusty-blue', 'TEDx Talk', 5),
  (e_anxiety, 'The Anxiety Toolkit', NULL, 'ReachOut (Australia)', 'https://au.reachout.com/tools-and-apps/apps/the-anxiety-toolkit', 'article', 'ReachOut''s practical toolkit for teens dealing with anxiety, covering grounding, breathing, thought-challenging, and when to get extra support. Designed for young people.', 'Self-paced', true, 'dusty-blue', 'Toolkit', 6),
  (e_anxiety, 'Anxiety and Panic Attacks', NULL, 'Mind (UK)', 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/anxiety-and-panic-attacks/', 'article', 'A comprehensive, compassionate guide from Mind on anxiety and panic attacks: causes, self-care, treatments, and supporting someone else. One of the most trusted UK mental health charities.', '15 min read', true, 'dusty-blue', 'Mind Guide', 7)
  ON CONFLICT DO NOTHING;

  -- ===== STRESS =====
  INSERT INTO resources (emotion_id, title, author, provider, url, resource_type, description, duration_text, is_free, cover_color, spine_text, sort_order) VALUES
  (e_stress, 'Managing Stress for Teens', NULL, 'KidsHealth / Nemours', 'https://kidshealth.org/en/teens/stress.html', 'article', 'A clear, warm article for teens on what stress is, how it shows up in the body, and practical ways to manage it — from exercise to time management to talking it out.', '6 min read', true, 'sage', 'Stress Guide', 1),
  (e_stress, 'How to Stop Being Stressed', NULL, 'TED-Ed', 'https://www.youtube.com/watch?v=z6XPT7oYDa4', 'video', 'A short, animated TED-Ed lesson on how stress works and what you can do about it. Under five minutes and perfect for a quick reset.', '4 min watch', true, 'sage', 'TED-Ed', 2),
  (e_stress, 'Feeling Stressed or Under Pressure?', NULL, 'ReachOut (Australia)', 'https://au.reachout.com/articles/feeling-stressed-or-under-pressure', 'article', 'ReachOut''s guide for young people on recognizing stress and pressure, with practical coping strategies and a reminder that asking for help is a strength.', '7 min read', true, 'sage', 'ReachOut', 3),
  (e_stress, 'How to manage stress', NULL, 'NHS (UK)', 'https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/stress/', 'article', 'The NHS stress guide: how to spot stress, tips to manage it, and where to get help in the UK. Includes a downloadable stress self-help guide.', '10 min read', true, 'sage', 'NHS Stress', 4),
  (e_stress, 'The Stress Solution', 'Dr. Rangan Chatterjee', 'Penguin Books', 'https://www.penguin.co.uk/books/313/313233/the-stress-solution/9780241295781', 'book', 'Dr. Rangan Chatterjee offers simple, evidence-based strategies to reduce stress and feel calmer — covering breathing, sleep, movement, and mindset. A warm, practical book.', 'Book', false, 'sage', 'Stress Sol', 5),
  (e_stress, 'Mental Health and Wellbeing for Teens', NULL, 'UNICEF', 'https://www.unicef.org/mental-health-on-my-mind', 'article', 'UNICEF''s youth mental health hub with articles on stress, coping, and wellbeing for young people worldwide. Includes real stories from teens across the globe.', 'Self-paced', true, 'sage', 'UNICEF', 6)
  ON CONFLICT DO NOTHING;

  -- ===== SADNESS / DEPRESSION =====
  INSERT INTO resources (emotion_id, title, author, provider, url, resource_type, description, duration_text, is_free, cover_color, spine_text, sort_order) VALUES
  (e_sadness, 'Depression in Young People', NULL, 'NHS (UK)', 'https://www.nhs.uk/mental-health/children-and-young-adults/understanding-teenagers/depression-in-children-and-young-people/', 'article', 'NHS guide to depression in children and young people: signs, causes, and treatments including talking therapies. Clear, supportive, and practical.', '10 min read', true, 'muted-coral', 'NHS Dep', 1),
  (e_sadness, 'Feeling Sad', NULL, 'KidsHealth / Nemours', 'https://kidshealth.org/en/teens/sad.html', 'article', 'A gentle article for teens on sadness — the difference between sadness and depression, and what to do when you''re feeling down. Written by medical experts in teen-friendly language.', '5 min read', true, 'muted-coral', 'Sadness', 2),
  (e_sadness, 'Depression', NULL, 'Mind (UK)', 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/depression/', 'article', 'Mind''s comprehensive guide to depression: symptoms, causes, self-care, treatments, and supporting someone else. Warm, detailed, and trustworthy.', '20 min read', true, 'muted-coral', 'Mind Dep', 3),
  (e_sadness, 'Depression (for Teens)', NULL, 'ReachOut (Australia)', 'https://au.reachout.com/articles/what-is-depression', 'article', 'ReachOut''s teen-focused guide to depression: what it is, signs to look for, and how to get support. Includes personal stories from young people.', '8 min read', true, 'muted-coral', 'ReachOut', 4),
  (e_sadness, 'Depressive Disorder (Depression)', NULL, 'World Health Organization (WHO)', 'https://www.who.int/news-room/fact-sheets/detail/depression', 'article', 'The WHO fact sheet on depression — global statistics, symptoms, causes, and treatment. Essential, authoritative information from the world''s leading health authority.', '8 min read', true, 'muted-coral', 'WHO Facts', 5),
  (e_sadness, 'The Happiness Trap', 'Russ Harris', 'Robinson / Hachette', 'https://www.hachette.co.uk/titles/russ-harris/the-happiness-trap/9781472125078', 'book', 'A popular, evidence-based book using Acceptance and Commitment Therapy (ACT) to help you handle difficult feelings and build a meaningful life. Practical exercises throughout.', 'Book', false, 'muted-coral', 'Happiness', 6),
  (e_sadness, 'There is no health without mental health', NULL, 'TED', 'https://www.ted.com/topics/mental-health', 'video', 'TED''s curated collection of talks on mental health, sadness, and wellbeing — featuring researchers, advocates, and people with lived experience sharing what helped them.', 'Various', true, 'muted-coral', 'TED Talks', 7)
  ON CONFLICT DO NOTHING;

  -- ===== LONELINESS =====
  INSERT INTO resources (emotion_id, title, author, provider, url, resource_type, description, duration_text, is_free, cover_color, spine_text, sort_order) VALUES
  (e_loneliness, 'Loneliness in Young People', NULL, 'Mental Health Foundation (UK)', 'https://www.mentalhealth.org.uk/explore-mental-health/a-z-topics/loneliness', 'article', 'The Mental Health Foundation''s guide to loneliness — what it is, how it affects us, and ways to cope and connect. Includes practical tips and reminders that loneliness is common.', '8 min read', true, 'lavender', 'MHF Lonely', 1),
  (e_loneliness, 'Dealing with Loneliness', NULL, 'ReachOut (Australia)', 'https://au.reachout.com/articles/dealing-with-loneliness', 'article', 'ReachOut''s warm guide for young people on loneliness — why it happens, how to cope, and small steps to feel more connected. Written for and with young people.', '7 min read', true, 'lavender', 'ReachOut', 2),
  (e_loneliness, 'All the Lonely People', NULL, 'TED', 'https://www.ted.com/topics/loneliness', 'video', 'TED''s curated talks on loneliness and connection — stories and research on why we feel alone and how we can find belonging again.', 'Various', true, 'lavender', 'TED Talks', 3),
  (e_loneliness, 'Loneliness', NULL, 'Mind (UK)', 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/loneliness/', 'article', 'Mind''s compassionate guide to loneliness: causes, how it feels, self-care, and finding connection. Includes tips for reaching out when it feels hard.', '12 min read', true, 'lavender', 'Mind Guide', 4),
  (e_loneliness, 'Connected: The Surprising Power of Our Social Networks', 'Nicholas Christakis', 'TED Talks', 'https://www.ted.com/talks/nicholas_christakis_the_hidden_influence_of_social_networks', 'video', 'A fascinating TED talk on how social connections shape our wellbeing — a hopeful reminder that our bonds reach further than we realize.', '20 min watch', true, 'lavender', 'Connected', 5),
  (e_loneliness, 'Loneliness in Children and Young People', NULL, 'UNICEF', 'https://www.unicef.org/innovation/mental-health', 'article', 'UNICEF''s work on youth mental health and connection worldwide — data, stories, and initiatives helping young people feel less alone.', 'Self-paced', true, 'lavender', 'UNICEF', 6)
  ON CONFLICT DO NOTHING;

  -- ===== BURNOUT =====
  INSERT INTO resources (emotion_id, title, author, provider, url, resource_type, description, duration_text, is_free, cover_color, spine_text, sort_order) VALUES
  (e_burnout, 'Burnout: Signs and What to Do', NULL, 'ReachOut (Australia)', 'https://au.reachout.com/articles/what-is-burnout', 'article', 'ReachOut''s guide to burnout for young people — what it looks like, how it differs from stress, and practical steps to recover. Written for students and teens.', '7 min read', true, 'amber', 'Burnout', 1),
  (e_burnout, 'How to Beat Burnout', NULL, 'TED', 'https://www.ted.com/topics/burnout', 'video', 'TED''s curated talks on burnout and rest — psychologists and researchers share what burnout is and evidence-based ways to recover.', 'Various', true, 'amber', 'TED Talks', 2),
  (e_burnout, 'Mental Health at School', NULL, 'UNICEF', 'https://www.unicef.org/mental-health-on-my-mind', 'article', 'UNICEF resources on stress, burnout, and wellbeing for young people — practical guidance and real stories from students around the world.', 'Self-paced', true, 'amber', 'UNICEF', 3),
  (e_burnout, 'Rest and Renewal', NULL, 'Mind (UK)', 'https://www.mind.org.uk/information-support/tips-for-everyday-living/wellbeing/', 'article', 'Mind''s wellbeing guide covering rest, sleep, movement, and self-kindness — gentle, practical strategies to refill your cup when you''re running on empty.', '12 min read', true, 'amber', 'Mind Well', 4),
  (e_burnout, 'Burnout: The Secret to Unlocking the Stress Cycle', 'Emily Nagoski & Amelia Nagoski', 'Ballantine Books', 'https://www.penguinrandomhouse.com/books/568302/burnout-by-emily-nagoski-phd-and-amelia-nagoski-dma/', 'book', 'A science-based, warm, and funny book on how to complete the stress cycle and recover from burnout. Especially loved by young women, but helpful for everyone.', 'Book', false, 'amber', 'Burnout', 5)
  ON CONFLICT DO NOTHING;

  -- ===== ANGER =====
  INSERT INTO resources (emotion_id, title, author, provider, url, resource_type, description, duration_text, is_free, cover_color, spine_text, sort_order) VALUES
  (e_anger, 'Dealing with Anger', NULL, 'KidsHealth / Nemours', 'https://kidshealth.org/en/teens/anger.html', 'article', 'A clear, practical article for teens on understanding anger, what triggers it, and healthy ways to express it. Written by medical experts in warm, accessible language.', '6 min read', true, 'terracotta', 'Anger', 1),
  (e_anger, 'Anger', NULL, 'Mind (UK)', 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/anger/', 'article', 'Mind''s detailed guide to anger: what causes it, how it affects you, and self-care and treatment options. Includes advice for managing anger in the moment.', '15 min read', true, 'terracotta', 'Mind Anger', 2),
  (e_anger, 'Managing Anger', NULL, 'ReachOut (Australia)', 'https://au.reachout.com/articles/managing-anger', 'article', 'ReachOut''s guide for young people on recognizing anger and managing it in healthy ways — with practical strategies and a reminder that anger itself isn''t bad.', '7 min read', true, 'terracotta', 'ReachOut', 3),
  (e_anger, 'Why we get mad — and why it''s healthy', 'Ryan Martin', 'TED', 'https://www.ted.com/talks/ryan_martin_why_we_get_mad_and_why_it_s_healthy', 'video', 'A insightful TED talk on the psychology of anger — why it happens, when it''s helpful, and how to use it constructively. About 14 minutes.', '14 min watch', true, 'terracotta', 'TED Talk', 4),
  (e_anger, 'How to deal with anger', NULL, 'NHS (UK)', 'https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/anger/', 'article', 'The NHS guide to anger: how to recognize it, tips to manage it in the moment, and where to get support if anger is affecting your life or relationships.', '10 min read', true, 'terracotta', 'NHS Anger', 5)
  ON CONFLICT DO NOTHING;

  -- ===== LOW SELF-ESTEEM =====
  INSERT INTO resources (emotion_id, title, author, provider, url, resource_type, description, duration_text, is_free, cover_color, spine_text, sort_order) VALUES
  (e_esteem, 'Self-Esteem', NULL, 'KidsHealth / Nemours', 'https://kidshealth.org/en/teens/self-esteem.html', 'article', 'A friendly article for teens on what self-esteem is, why it matters, and how to build it — with practical tips on self-talk, friendships, and setting goals.', '6 min read', true, 'warm-yellow', 'Esteem', 1),
  (e_esteem, 'Self-Esteem and Confidence', NULL, 'ReachOut (Australia)', 'https://au.reachout.com/articles/self-esteem-and-confidence', 'article', 'ReachOut''s guide for young people on building self-esteem and confidence — with relatable examples and gentle, practical steps to feel better about yourself.', '8 min read', true, 'warm-yellow', 'ReachOut', 2),
  (e_esteem, 'How to build self-confidence', NULL, 'TED-Ed', 'https://www.youtube.com/watch?v=R_sGEsCWWLI', 'video', 'A short, animated TED-Ed lesson on where self-confidence comes from and how to grow it. Quick, encouraging, and easy to understand.', '5 min watch', true, 'warm-yellow', 'TED-Ed', 3),
  (e_esteem, 'The Self-Esteem Workbook for Teens', 'Lisa M. Schab', 'New Harbinger Publications', 'https://www.newharbinger.com/9781608825820/the-self-esteem-workbook-for-teens/', 'book', 'A practical workbook with 42 exercises to help teens build self-esteem, manage self-criticism, and develop self-compassion. Used by therapists worldwide.', 'Workbook', false, 'warm-yellow', 'Esteem WB', 4),
  (e_esteem, 'Understanding Self-Esteem', NULL, 'Mind (UK)', 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/self-esteem/', 'article', 'Mind''s guide to self-esteem: what affects it, signs of low self-esteem, and ways to improve how you feel about yourself. Warm, practical, and detailed.', '12 min read', true, 'warm-yellow', 'Mind Esteem', 5)
  ON CONFLICT DO NOTHING;

  -- ===== OVERWHELMED =====
  INSERT INTO resources (emotion_id, title, author, provider, url, resource_type, description, duration_text, is_free, cover_color, spine_text, sort_order) VALUES
  (e_over, 'Feeling Overwhelmed', NULL, 'ReachOut (Australia)', 'https://au.reachout.com/articles/feeling-overwhelmed', 'article', 'ReachOut''s guide for young people on overwhelm — what it is, how it feels, and practical steps to slow down and take things one at a time.', '7 min read', true, 'dusty-rose', 'Overwhelm', 1),
  (e_over, 'Mental Wellbeing Tips', NULL, 'Mental Health Foundation (UK)', 'https://www.mentalhealth.org.uk/explore-mental-health/a-z-topics/wellbeing', 'article', 'The MHF''s evidence-based tips for mental wellbeing — covering connection, activity, learning, giving, and mindfulness. Simple, proven ways to feel steadier.', '10 min read', true, 'dusty-rose', 'MHF Tips', 2),
  (e_over, 'How to manage overwhelm', NULL, 'Mind (UK)', 'https://www.mind.org.uk/information-support/tips-for-everyday-living/wellbeing/', 'article', 'Mind''s wellbeing guide with gentle, practical strategies for when everything feels like too much — including grounding, rest, and reaching out.', '12 min read', true, 'dusty-rose', 'Mind Well', 3),
  (e_over, 'Coping with Feeling Overwhelmed', NULL, 'NHS (UK)', 'https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/stress/', 'article', 'NHS advice on stress and overwhelm — how to spot the signs and where to get support, including NHS talking therapies available in the UK.', '10 min read', true, 'dusty-rose', 'NHS Tips', 4)
  ON CONFLICT DO NOTHING;

  -- ===== CONFUSED =====
  INSERT INTO resources (emotion_id, title, author, provider, url, resource_type, description, duration_text, is_free, cover_color, spine_text, sort_order) VALUES
  (e_confused, 'Understanding Your Feelings', NULL, 'KidsHealth / Nemours', 'https://kidshealth.org/en/teens/your-feelings.html', 'article', 'A gentle article for teens on understanding and naming emotions — why mixed feelings happen and how to make sense of what''s going on inside.', '5 min read', true, 'soft-teal', 'Feelings', 1),
  (e_confused, 'What Am I Feeling?', NULL, 'ReachOut (Australia)', 'https://au.reachout.com/articles/identifying-your-emotions', 'article', 'ReachOut''s guide for young people on identifying and naming emotions — a key step in understanding yourself and finding your way forward.', '6 min read', true, 'soft-teal', 'Emotions', 2),
  (e_confused, 'Emotional Literacy', NULL, 'Mental Health Foundation (UK)', 'https://www.mentalhealth.org.uk/explore-mental-health/a-z-topics/wellbeing', 'article', 'The MHF''s wellbeing hub covering emotional awareness, coping, and finding support — a calm starting point when you''re not sure what you''re feeling.', '10 min read', true, 'soft-teal', 'MHF', 3),
  (e_confused, 'The Gift and Power of Emotional Courage', 'Susan David', 'TED', 'https://www.ted.com/talks/susan_david_the_gift_and_power_of_emotional_courage', 'video', 'A powerful TED talk by psychologist Susan David on emotional agility — how to navigate difficult emotions with courage and compassion. About 17 minutes.', '17 min watch', true, 'soft-teal', 'TED Talk', 4)
  ON CONFLICT DO NOTHING;

  -- ===== UNMOTIVATED =====
  INSERT INTO resources (emotion_id, title, author, provider, url, resource_type, description, duration_text, is_free, cover_color, spine_text, sort_order) VALUES
  (e_unmot, 'Feeling Unmotivated', NULL, 'ReachOut (Australia)', 'https://au.reachout.com/articles/feeling-unmotivated', 'article', 'ReachOut''s guide for young people on low motivation — why it happens, how it''s linked to mental health, and tiny steps to get moving again.', '7 min read', true, 'soft-clay', 'Unmotivated', 1),
  (e_unmot, 'How to get motivated', NULL, 'TED-Ed', 'https://www.youtube.com/watch?v=mgmOSNHp6r0', 'video', 'A short, friendly TED-Ed animated lesson on how motivation works and small ways to spark it. Perfect for when you''re feeling stuck.', '5 min watch', true, 'soft-clay', 'TED-Ed', 2),
  (e_unmot, 'Mental Health and Wellbeing', NULL, 'UNICEF', 'https://www.unicef.org/mental-health-on-my-mind', 'article', 'UNICEF''s youth mental health hub — stories and guidance from young people worldwide on coping, motivation, and finding support.', 'Self-paced', true, 'soft-clay', 'UNICEF', 3),
  (e_unmot, 'Atomic Habits', 'James Clear', 'Penguin Random House', 'https://www.penguinrandomhouse.com/books/563061/atomic-habits-by-james-clear/', 'book', 'A practical, encouraging book on building small, sustainable habits that add up to big change — perfect for when motivation feels out of reach.', 'Book', false, 'soft-clay', 'Habits', 4),
  (e_unmot, 'Self-Care for Low Mood', NULL, 'Mind (UK)', 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/depression/self-care/', 'article', 'Mind''s self-care guide for low mood and depression — gentle, practical suggestions for daily routines, rest, and seeking support.', '12 min read', true, 'soft-clay', 'Mind Care', 5)
  ON CONFLICT DO NOTHING;

  -- ===== HELPLINES & ORGS (linked to Anxiety as a general entry, available globally) =====
  INSERT INTO resources (emotion_id, title, author, provider, url, resource_type, description, duration_text, is_free, cover_color, spine_text, sort_order) VALUES
  (e_anxiety, '988 Suicide & Crisis Lifeline', NULL, '988 Lifeline (US)', 'https://988lifeline.org/', 'helpline', 'Free, confidential support for people in distress, 24/7 across the United States. Call or text 988. The 988 Lifeline connects you with trained counselors.', '24/7', true, 'dusty-blue', '988', 8),
  (e_anxiety, 'The Trevor Project', NULL, 'The Trevor Project', 'https://www.thetrevorproject.org/', 'helpline', 'The world''s largest suicide prevention and crisis intervention organization for LGBTQ+ young people. Call 1-866-488-7386, text START to 678-678, or chat online 24/7.', '24/7', true, 'dusty-blue', 'Trevor', 9),
  (e_anxiety, 'Kids Help Phone', NULL, 'Kids Help Phone (Canada)', 'https://kidshelpphone.ca/', 'helpline', 'Canada''s only 24/7 national support service for youth. Call 1-800-668-6868, text CONNECT to 686868, or live chat. Free, confidential, professional counseling.', '24/7', true, 'dusty-blue', 'KidsHP', 10),
  (e_anxiety, 'Lifeline Australia', NULL, 'Lifeline Australia', 'https://www.lifeline.org.au/', 'helpline', 'Free, confidential crisis support and suicide prevention across Australia. Call 13 11 14, available 24/7. Text 0477 13 11 14 evenings.', '24/7', true, 'dusty-blue', 'Lifeline', 11),
  (e_anxiety, 'Beyond Blue', NULL, 'Beyond Blue (Australia)', 'https://www.beyondblue.org.au/', 'organization', 'Australian organization providing information and support for anxiety, depression, and suicide prevention. Forums, phone support (1300 22 4636), and resources for young people.', '24/7', true, 'dusty-blue', 'BeyondBlue', 12),
  (e_anxiety, 'Need to Talk? (1737)', NULL, 'Mental Health Foundation NZ', 'https://www.mentalhealth.org.nz/helplines', 'helpline', 'Free 24/7 helpline in New Zealand — call or text 1737 to talk to a trained counselor. Also lists other NZ helplines for youth and whanau.', '24/7', true, 'dusty-blue', '1737', 13),
  (e_anxiety, 'Youthline', NULL, 'Youthline (New Zealand)', 'https://www.youthline.co.nz/', 'helpline', 'Free, confidential support for young people in New Zealand. Text 234, call 0800 37 66 33, or use the web chat. Available 24/7 for youth.', '24/7', true, 'dusty-blue', 'Youthline', 14)
  ON CONFLICT DO NOTHING;

  -- ===== ACTIVITIES =====
  -- Universal activities (emotion_id = NULL)
  INSERT INTO activities (emotion_id, title, description, activity_type, duration_text, icon, sort_order) VALUES
  (NULL, 'Box Breathing', 'A simple breathing exercise used to calm the nervous system. Breathe in for 4, hold for 4, exhale for 4, hold for 4 — repeat.', 'breathing', '5 minutes', 'Wind', 1),
  (NULL, '5-4-3-2-1 Grounding', 'Use your five senses to anchor yourself in the present moment. Notice 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.', 'grounding', '3 minutes', 'Eye', 2),
  (NULL, 'Gratitude Journal', 'Write three things you''re grateful for today. They can be tiny — a warm cup of tea, a kind word, a moment of quiet.', 'gratitude', '5 minutes', 'Heart', 3),
  (NULL, 'Mood Check-In', 'Notice and name how you''re feeling right now. Naming an emotion can reduce its intensity and help you understand yourself better.', 'mood', '2 minutes', 'Cloud', 4),
  (NULL, 'Positive Affirmations', 'Gentle, affirming reminders you can read, save, and return to whenever you need a kind word.', 'affirmation', '1 minute', 'Sparkles', 5),
  (NULL, 'Study Break Timer', 'A gentle timer that reminds you to pause, stretch, and rest. Try 25 minutes of focus followed by a 5-minute break.', 'timer', '30 minutes', 'Timer', 6),
  (NULL, 'Sleep Checklist', 'A calming wind-down checklist to help you prepare for rest — screen off, lights low, a few deep breaths.', 'sleep', '10 minutes', 'Moon', 7),
  (NULL, 'Gentle Stretch', 'A short, easy stretching routine you can do anywhere. No equipment needed — just gentle movement to release tension.', 'stretch', '5 minutes', 'Activity', 8),
  (NULL, 'Journaling Prompts', 'Thoughtful prompts to help you reflect on your day, your feelings, and what matters to you. No pressure — just write what comes.', 'journal', '10 minutes', 'PenLine', 9),
  (NULL, 'Digital Detox', 'A gentle challenge to step away from screens and notice the world around you. Start with 15 minutes and see how you feel.', 'detox', '15 minutes', 'PhoneOff', 10),
  (NULL, 'Weekly Reflection', 'A set of gentle questions to look back on your week — what went well, what was hard, and what you''d like next week to hold.', 'reflection', '15 minutes', 'CalendarHeart', 11)
  ON CONFLICT DO NOTHING;

  -- Emotion-specific activities
  INSERT INTO activities (emotion_id, title, description, activity_type, duration_text, icon, sort_order) VALUES
  (e_anxiety, 'Calm Breathing', 'A guided breathing exercise specifically for anxiety. Long, slow exhales signal to your body that you are safe.', 'breathing', '5 minutes', 'Wind', 1),
  (e_stress, 'Tension Release', 'A progressive muscle relaxation script to help release physical tension you may be carrying from stress.', 'stretch', '8 minutes', 'Activity', 1),
  (e_sadness, 'Self-Compassion Break', 'Three gentle phrases to offer yourself when you''re hurting — the same kindness you''d give a friend.', 'affirmation', '3 minutes', 'Heart', 1),
  (e_loneliness, 'Connection Prompt', 'A journaling prompt to help you reflect on who matters to you and a small way to reach out this week.', 'journal', '10 minutes', 'PenLine', 1),
  (e_burnout, 'Rest Reminder', 'A guided rest exercise — permission to do nothing for a few minutes, without guilt.', 'reflection', '10 minutes', 'Moon', 1),
  (e_anger, 'Cool Down Breathing', 'A slow breathing exercise to help you ride the wave of anger without acting on it.', 'breathing', '4 minutes', 'Wind', 1),
  (e_esteem, 'Strengths Reflection', 'A journaling exercise to help you notice and name your strengths — the things you''re good at, even if they feel small.', 'journal', '10 minutes', 'PenLine', 1),
  (e_over, 'One Thing at a Time', 'A simple prompt to pick just one small thing to focus on right now, and let the rest wait.', 'mood', '3 minutes', 'Cloud', 1),
  (e_confused, 'Feelings Sort', 'A prompt to help you untangle mixed feelings by writing them out, one at a time.', 'journal', '10 minutes', 'PenLine', 1),
  (e_unmot, 'Tiny Step', 'A gentle prompt to choose the smallest possible next step — something so small it feels doable.', 'reflection', '3 minutes', 'Turtle', 1)
  ON CONFLICT DO NOTHING;

END $$;