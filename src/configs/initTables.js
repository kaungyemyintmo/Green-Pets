const pool = require("../services/db.js"); 

const SQLSTATEMENT = `
DROP TABLE IF EXISTS User; 
DROP TABLE IF EXISTS Task; 
DROP TABLE IF EXISTS TaskProgress; 
DROP TABLE IF EXISTS Pet;
DROP TABLE IF EXISTS PetDuties; 
DROP TABLE IF EXISTS Trivia; 
DROP TABLE IF EXISTS Messages;
DROP TABLE IF EXISTS PetsInStore;

CREATE TABLE Messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  message_text TEXT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Messages (message_text, user_id) VALUES
  ("Hello world!", 1),
  ("Yummy!", 2),  
  ("I am the one", 3);

CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username TEXT,
    email TEXT, 
    password TEXT, 
    total_points INT DEFAULT 0, 
    trivia_progress INT DEFAULT 0
   );
   
   CREATE TABLE Task (
    task_id INT PRIMARY KEY AUTO_INCREMENT,
    title TEXT,
    description TEXT,
    points INT
   );
   CREATE TABLE TaskProgress (
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    completion_date TIMESTAMP,
    notes VARCHAR(1000) DEFAULT ''
   );
   CREATE TABLE PetsInStore (
    store_id INT PRIMARY KEY AUTO_INCREMENT, 
    type TEXT, 
    points TEXT, 
    msg TEXT
   ); 
   CREATE TABLE Pet (
    pet_id INT PRIMARY KEY AUTO_INCREMENT,
    store_id INT, 
    user_id INT,
    pet_name TEXT, 
    type TEXT,
    color TEXT,
    born_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pet_energies INT DEFAULT 0,
    pet_level INT DEFAULT 1
   ); 
   CREATE TABLE PetDuties (
    duty_id INT PRIMARY KEY AUTO_INCREMENT,
    duty TEXT,
    energies INT, 
    cost_points INT
    ); 
   CREATE TABLE Trivia (
    trivia_id INT PRIMARY KEY AUTO_INCREMENT, 
    question TEXT, 
    options TEXT, 
    correctOpt INT,  
    points INT NOT NULL
   );

   INSERT INTO PetsInStore (store_id, type, points, msg) VALUES 
   (1, 'Mini Cow', '100', "Moo! Hi there! I'm just a sweet little cow looking for a loving home. I promise to fill your days with gentle mooing, warm cuddles, and lots of adorable moments. Adopt me, and let's create a 'moo'-velous bond together! "), 
   (2, 'Husky', '150', "Woof! Hey, future best friend! I'm a fluffy little husky with a heart full of love and a spirit ready for adventures. Let's go on walks, play fetch, and build a lifetime of memories together. Adopt me, and let the pawsitively amazing journey begin! "), 
   (3, 'Kitty', '100', "Meow! Hello, potential purr-son! I'm a tiny ball of fur with big dreams of finding a forever home. I come with a purr that can turn any day into a sunny one and a playful spirit that's impossible to resist. Adopt me, and together we can create a purr-fectly wonderful life!"), 
   (4, 'Piglet', '130', "Oink! Hi there! I'm a little piglet with a heart as big as my ears, and I'm on the lookout for a snuggly, loving home. I promise to fill your days with adorable oinks, joyous wallows, and a whole lot of piggy charm.Adopt me, and let's sow the seeds of happiness together!"), 
   (5, "Puffer Fish", "230", "Blub! I may be small, but my heart is as big as the ocean! With my adorable puffy cheeks and charming fins, I'm here to bring a splash of happiness into your life. Adopt me, and together we can explore the wonders of underwater love!"), 
   (6, 'Froggy', '250', "Ribbit! I'm a tiny frog with a big hop in my step and even bigger dreams of finding a hop-tastic forever home. With my colorful skin and playful leaps, I'm ready to bring joy and charm to your life. Adopt me, and let's create amphibious adventures!"), 
   (7, 'Handsome Hamster', '120', "Squeak! I'm a pocket-sized bundle of joy, and I'm on a quest to find a cozy home and a heart to call my own. Adopt me, and let's roll into a world of hamster happiness together!"), 
   (8, 'Awesome Axolotl', '200', "Hello there! I'm a delightful little axolotl with a permanent smile and a heart full of aquatic charm. With my frilly gills and wiggly antics, I'm ready to turn your space into a haven of underwater wonder."), 
   (9, 'Clam', '230', "Shell-o there! I'm a tiny clam with a world of pearls inside, and I'm looking for a cozy spot to call home. Adopt me, and let's create a sea-nsational bond filled with love and shimmering moments!"), 
   (10, 'Squirrel', '120', "Chitter-chatter! I'm a bushy-tailed ball of energy, ready to bring joy and laughter into your life. With my acrobatic moves and fuzzy charm, I'm on a quest to find a loving home where we can share nutty adventures together."), 
   (11, 'Bilingual Bee' , '100' , "Buzz! ¡Hola! I'm a pequeña bee with a love for honey and a heart that speaks two languages. Adopt me, and let's create a hive of joy where we can both 'bee' happy together! Adios!"), 
   (12, 'Bilingual Bunny', '180', "Hop! Nǐ hǎo! I'm a adorable bilingual bunny with fluffy ears and a heart that speaks both English and Chinese. Adopt me, and let's create a world where love knows no language barriers!"), 
   (13, 'Chick', '180', "Peep-peep! I'm a tiny ball of fluff with a heart full of chirpy excitement, and I'm on the lookout for a cozy nest to call home. Adopt me, and let's embark on a feathered adventure filled with endless peeps!"), 
   (14, 'Elephant', '120', "Trumpet-trumpet! I'm a lovable little elephant with big ears and an even bigger heart, and I'm in search of a forever family. Adopt me, and together, let's create a trunk-tastic journey of happiness!"), 
   (15, 'Panda', '160', "Nihao! I'm a sweet little panda with a heart as black and white as my fur, and I'm on a bamboo-filled adventure to find a loving home. With my adorable panda eyes and playful antics, I'm here to bring cuddles, happiness, and a whole lot of bamboo joy into your life."),
   (16, 'Tiger', '140', "Roar! I may be a tiny tiger, but my heart is as fierce as can be, and I'm searching for a jungle of love to call my own. Adopt me, and let's embark on a wild journey together!"), 
   (17, 'Baby Corgi', '190', "Woof! I'm an adorable baby corgi with a heart as big as my fluffy ears, and I'm on a paw-some mission to find a loving home.With my short legs and wagging tail, I promise to bring endless cuteness and loyalty into your life!"), 
   (18, 'Forest Dragon', '200', "Roar! I'm a cuddly little dragon with a heart as warm as dragon scales, ready to bring a touch of mythical charm into your life. Adopt me!"), 
   (19, 'Lion', '150', "Roar! I'm a tiny lion cub with a mane full of fluff and a heart that's as brave as can be. Join me on a roar-some adventure, and let's fill our days with cuddles, laughter, and a jungle of love!"), 
   (20, 'Donut Sloth', '170', "Hi there! I'm a sweet little sloth looking for a cozy spot to call home. With my slow-motion hugs and adorable smile, I'm ready to being love and donuts to your life!"), 
   (21, 'Squishy Squid', '170', "Blub-blub! I'm a squishy little squid with a heart as soft as my tentacles, and I'm on a mission to find a home filled with underwater adventures and love. Let's dive into a world of cuddles and joy!"), 
   (22, 'Sakura Shiba', '210', "Woof! I'm a Shiba Inu, blossoming with charm and ready to bring a touch of Japanese beauty into your life. Join me in a world of fluffy cuddles, blooming adventures, and a lifetime of paw-some companionship!"), 
   (23, 'Caterpillar', '140', "Creep-crawl! I'm a cute caterpillar on the lookout for a caring friend to join me in my transformation into a beautiful butterfly. Let's flutter through life together, turning each day into a winged adventure!"), 
   (24, 'Mountain Goat', '170', "Baa! I'm a fluffy mountain goat ready to bring peaks of joy and boundless energy into your life. Let's climb the hills of happiness together and create a mountainous adventure filled with love and laughter!"), 
   (25, 'Stallion', '100', "Neigh! I'm a spirited little stallion with a heart as wild as the open fields. Gallop into a world of joy with me, and let's create a hoof-tastic bond filled with love and endless adventures!"), 
   (26, 'Fire Dragon', '250', "Roar! I'm a tiny dragon with a heart full of fire and a world of magic to share. Adopt me, and let's soar together into a realm of love, enchantment, and cuddles that are hotter than dragon breath!"), 
   (27, 'T-Rex', '230', "Roar! I may be a tiny T-Rex, but my heart is dino-sized and ready to stomp into your life with love and fun. Join me on a Jurassic journey, and let's create dino-mite memories together!"), 
   (28, 'Hippo', '160', "Hello! I'm a lovable little hippo, and I'm searching for a cozy lagoon to call home. With my squishy cheeks and big heart, let's wade through life together, creating a river of joy and endless cuddles!"), 
   (29, 'Lemur', '150', "Chirp-chirp! I'm a playful little lemur with big eyes and an even bigger heart, and I'm looking for a treehouse filled with love. Swing into my world, and let's embark on a tail-twisting adventure!"), 
   (30, 'Sheep', '150', "Baa! I'm a fluffy little sheep, ready to fill your days with warmth and woolly wonders. Adopt me, and let's embark on a cozy journey of friendship, where every moment is as soft and delightful as my fleece!"), 
   (31, 'Brilliant Owl', '220', "Hoot! I'm a brilliant little owl with a love for books, ready to bring wisdom and whimsy into your life. Adopt me, and let's soar through the pages of knowledge together, creating a nest of nerdy joy and endless learning!"),
   (32, 'Bald Turtle', '170', "Hello! I may not have a fancy shell, but I have a heart as resilient as a tortoise. Adopt me, and let's embark on a slow and steady journey together, creating a lifetime of love and shell-ter!"), 
   (33, 'Koala', '210', "Zzz... I'm a sleepy little koala, dreaming of a eucalyptus-filled haven to call home. Adopt me, and together we can create a world of tranquil naps and cuddly moments, where every day feels like a cozy tree branch!"), 
   (34, 'Laundry Bear', '140', "Hi there! I'm a fluffy little laundry bear, eager to bring a touch of cleanliness and cuteness to your life. Adopt me, and let's tumble into a world of softness, warm hugs, and a laundry basket full of love!"), 
   (35, 'Snooze Bear', '170', "Brrr... I'm a sleepy little ice bear, dreaming of a cozy igloo to call my own. Adopt me, and let's hibernate through life together, creating a world of chilly cuddles and frosty adventures!"), 
   (36, 'Boxer Kangaroo', '200', "Hop! I'm a spunky little kangaroo with a heart that packs a punch, ready to bounce into your life with love and energy. Adopt me, and let's create a knockout bond filled with playful hops!");

   INSERT INTO PetDuties (duty_id, duty, energies, cost_points) VALUES 
   (1, 'Go to the beach to pick up trash.', 5, 15), 
   (2, 'Make flower pots out of plastic water bottles.', 7, 25),
   (3, 'Make diy flowers out of old newspapers.', 7, 25), 
   (4, 'Volunteer at the animal shelter.', 10, 35), 
   (5, 'Donate clothes to the orphanage.', 10, 35),
   (6, 'Watch videos on how to save the planet.', 5, 15),
   (7, "Take part in Earth Hour.", 5, 15);

   INSERT INTO Task (task_id, title, description, points) VALUES
   (1, 'Plant a Tree', 'Plant a tree in your neighbourhood or a designated green area', '50'),
   (2, 'Use Public Transportation', 'Use public transportation or carpool instead of driving alone', 30),
   (3, 'Reduce Plastic Usage', 'Commit to using reusable bags and containers.', 40),
   (4, 'Energy Conservation', 'Turn off lights and appliances when not in use.', 25), 
   (5, 'Composting', 'Start composting kitchen scraps to create natural fertilizer.', 35); 

   INSERT INTO Trivia (trivia_id, question, options, correctOpt, points) VALUES 
   (1, "What are the three R's?", "1. Reduce, Reuse, Recycle (OR) 2. Reduct, Reuse, Recycle", '1', '10'),
   (2, "Which two renewable energy sources are often used to generate electricity?", "1. Solar and wind energy (OR) 2. Water and nuclear energy", '1', '10'),
   (3, "What is the process of converting waste materials into reusable materials?", "1. Recycling (OR) 2. Reconverting", '1', '10'), 
   (4, "What inexhaustible source of energy comes from the sun?", "1. Moonlight (OR) 2. Solar Power", '2', '10'),
   (5, "Name a mode of transportation that produces zero carbon emissions.", "1. Rocketship (OR) 2. Electric Vehicle Express", '2', '10'),
   (6, "In what month is Earth Day celebrated worldwide to promote environmental awareness?", "1. January (OR) 2.April ", '2', '10'),
   (7, "What is the term for reducing, reusing, and recycling to minimize the environmental impact of consumption?", "1. Green Gymnastics (OR) 2. Sustainability Trio", '2', '10'),
   (8, "What term is used for animals or plants that are at risk of becoming extinct?", "1. Endangered Elegance (OR) 2. Threatened Treasures", '1', '10'),
   (9, "What simple action can individuals take to conserve water while brushing their teeth?", "1. Water Ballet (OR) 2. Turn Off the Tap Tango", '2', '10'),
   (10, "What is the primary gas responsible for the greenhouse effect on Earth?", "1. Oxygen (OR) 2. Carbon Dioxide", '2', '10'),
   (11, "What farming practice aims to maintain soil health, conserve water, and reduce the use of synthetic pesticides?", "1. Super Farming (OR) 2. Organic Marvel", '2', '10'),
   (12, "What term is used to describe the process of converting waste materials into reusable materials?", "1. Trash-taming (OR) 2. Recycling Revolution", '2', '10');

   SELECT 
   username, 
   email
   FROM User
   INNER JOIN 
   TaskProgress ON User.user_id = TaskProgress.user_id; 

   SELECT 
   title,
   description,
   points 
   FROM Task 
   INNER JOIN 
   TaskProgress ON Task.task_id = TaskProgress.task_id; 

`;

pool.query(SQLSTATEMENT, (error,results,fields) => {
    if (error) {
        console.error("Error creating tables : ", error);
    } else {
        console.log("Tables created successfully :", results);
    }
    process.exit();
} );