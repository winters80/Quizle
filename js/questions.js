// =============================================
// QUESTION BANK — 200 questions
// categories: movies | tv | scifi | fantasy | general
// difficulty:  easy  | medium | hard
// correct: index (0–3) into options array
// =============================================

const questions = [

  // =========================================
  // MOVIES 1980–2000  (60 questions)
  // =========================================

  // --- EASY (20) ---
  { id: 'm-e-001', category: 'movies', difficulty: 'easy',
    question: 'Which 1984 film features Bill Murray and Dan Aykroyd as ghost hunters?',
    options: ['Ghostbusters', 'Poltergeist', 'Beetlejuice', 'The Exorcist II'], correct: 0 },

  { id: 'm-e-002', category: 'movies', difficulty: 'easy',
    question: 'In Back to the Future (1985), what type of car is used as the time machine?',
    options: ['Ferrari Testarossa', 'Pontiac Firebird', 'DeLorean DMC-12', 'Chevrolet Corvette'], correct: 2 },

  { id: 'm-e-003', category: 'movies', difficulty: 'easy',
    question: 'Who played the Terminator in the 1984 film?',
    options: ['Sylvester Stallone', 'Arnold Schwarzenegger', 'Dolph Lundgren', 'Bruce Willis'], correct: 1 },

  { id: 'm-e-004', category: 'movies', difficulty: 'easy',
    question: 'Which 1986 Tom Cruise film features the song "Take My Breath Away"?',
    options: ['Top Gun', 'Iron Eagle', 'The Color of Money', 'Risky Business'], correct: 0 },

  { id: 'm-e-005', category: 'movies', difficulty: 'easy',
    question: 'In The Lion King (1994), what is the name of Simba\'s father?',
    options: ['Scar', 'Rafiki', 'Mufasa', 'Zazu'], correct: 2 },

  { id: 'm-e-006', category: 'movies', difficulty: 'easy',
    question: 'What 1982 Spielberg film features an alien who wants to "phone home"?',
    options: ['Close Encounters of the Third Kind', 'E.T. the Extra-Terrestrial', 'Cocoon', 'The Thing'], correct: 1 },

  { id: 'm-e-007', category: 'movies', difficulty: 'easy',
    question: 'Which 1980 Stanley Kubrick film has Jack Nicholson saying "Here\'s Johnny!"?',
    options: ['One Flew Over the Cuckoo\'s Nest', 'The Shining', 'As Good as It Gets', 'Five Easy Pieces'], correct: 1 },

  { id: 'm-e-008', category: 'movies', difficulty: 'easy',
    question: 'Who played Jack Dawson in Titanic (1997)?',
    options: ['Brad Pitt', 'Matt Damon', 'Tom Hanks', 'Leonardo DiCaprio'], correct: 3 },

  { id: 'm-e-009', category: 'movies', difficulty: 'easy',
    question: 'In Die Hard (1988), what is the name of the skyscraper that is taken hostage?',
    options: ['Sears Tower', 'One World Trade', 'Nakatomi Plaza', 'Empire State Building'], correct: 2 },

  { id: 'm-e-010', category: 'movies', difficulty: 'easy',
    question: 'Who directed Jurassic Park (1993)?',
    options: ['James Cameron', 'Ron Howard', 'Tim Burton', 'Steven Spielberg'], correct: 3 },

  { id: 'm-e-011', category: 'movies', difficulty: 'easy',
    question: 'What 1999 film stars Keanu Reeves as a hacker named Neo?',
    options: ['Johnny Mnemonic', 'The Matrix', 'Hackers', 'Strange Days'], correct: 1 },

  { id: 'm-e-012', category: 'movies', difficulty: 'easy',
    question: 'Which 1991 film features Anthony Hopkins as cannibal psychiatrist Hannibal Lecter?',
    options: ['Se7en', 'Manhunter', 'Copycat', 'The Silence of the Lambs'], correct: 3 },

  { id: 'm-e-013', category: 'movies', difficulty: 'easy',
    question: 'What 1994 film features Tom Hanks saying "Life is like a box of chocolates"?',
    options: ['Cast Away', 'Philadelphia', 'The Green Mile', 'Forrest Gump'], correct: 3 },

  { id: 'm-e-014', category: 'movies', difficulty: 'easy',
    question: 'What 1995 Pixar film was the studio\'s very first feature-length movie?',
    options: ['A Bug\'s Life', 'Monsters Inc', 'Finding Nemo', 'Toy Story'], correct: 3 },

  { id: 'm-e-015', category: 'movies', difficulty: 'easy',
    question: 'Which 1987 film features the famous line "Nobody puts Baby in a corner"?',
    options: ['Footloose', 'Flashdance', 'Dirty Dancing', 'Fame'], correct: 2 },

  { id: 'm-e-016', category: 'movies', difficulty: 'easy',
    question: 'Who played Indiana Jones in Raiders of the Lost Ark (1981)?',
    options: ['Tom Selleck', 'Mel Gibson', 'Harrison Ford', 'Kurt Russell'], correct: 2 },

  { id: 'm-e-017', category: 'movies', difficulty: 'easy',
    question: 'What 1990 film stars Julia Roberts as a woman who falls for a wealthy businessman played by Richard Gere?',
    options: ['Runaway Bride', 'My Best Friend\'s Wedding', 'Notting Hill', 'Pretty Woman'], correct: 3 },

  { id: 'm-e-018', category: 'movies', difficulty: 'easy',
    question: 'Which 1992 Disney animated film features a Genie voiced by Robin Williams?',
    options: ['Mulan', 'The Little Mermaid', 'Hercules', 'Aladdin'], correct: 3 },

  { id: 'm-e-019', category: 'movies', difficulty: 'easy',
    question: 'In Home Alone (1990), what is Kevin\'s last name?',
    options: ['Parker', 'Sullivan', 'McCallister', 'Johnson'], correct: 2 },

  { id: 'm-e-020', category: 'movies', difficulty: 'easy',
    question: 'What 1989 film stars Michael Keaton as a caped crusader with a dark secret?',
    options: ['Superman IV', 'The Shadow', 'Batman', 'The Rocketeer'], correct: 2 },

  // --- MEDIUM (25) ---
  { id: 'm-m-001', category: 'movies', difficulty: 'medium',
    question: 'Who plays the villain Hans Gruber in Die Hard (1988)?',
    options: ['Gary Oldman', 'Jeremy Irons', 'Alan Rickman', 'Ralph Fiennes'], correct: 2 },

  { id: 'm-m-002', category: 'movies', difficulty: 'medium',
    question: 'What actress played Sarah Connor in The Terminator (1984)?',
    options: ['Sigourney Weaver', 'Jamie Lee Curtis', 'Linda Hamilton', 'Geena Davis'], correct: 2 },

  { id: 'm-m-003', category: 'movies', difficulty: 'medium',
    question: 'In Pulp Fiction (1994), what dance do Mia Wallace and Vincent Vega perform at Jack Rabbit Slim\'s?',
    options: ['The Hustle', 'The Charleston', 'The Macarena', 'The Twist'], correct: 3 },

  { id: 'm-m-004', category: 'movies', difficulty: 'medium',
    question: 'Who plays Clarice Starling in The Silence of the Lambs (1991)?',
    options: ['Meryl Streep', 'Jodie Foster', 'Holly Hunter', 'Sigourney Weaver'], correct: 1 },

  { id: 'm-m-005', category: 'movies', difficulty: 'medium',
    question: 'What 1988 Tom Hanks film features a boy who wakes up in an adult\'s body?',
    options: ['The Burbs', 'Joe Versus the Volcano', 'Big', 'Splash'], correct: 2 },

  { id: 'm-m-006', category: 'movies', difficulty: 'medium',
    question: 'In Groundhog Day (1993), in what Pennsylvania town is weatherman Phil Connors stuck?',
    options: ['Pittsburgh', 'Allentown', 'Scranton', 'Punxsutawney'], correct: 3 },

  { id: 'm-m-007', category: 'movies', difficulty: 'medium',
    question: 'What 1990 film stars Patrick Swayze as a ghost trying to protect his girlfriend, played by Demi Moore?',
    options: ['Point Break', 'City of Joy', 'Ghost', 'Dirty Dancing'], correct: 2 },

  { id: 'm-m-008', category: 'movies', difficulty: 'medium',
    question: 'Who voiced Woody in Toy Story (1995)?',
    options: ['Billy Crystal', 'Steve Martin', 'Robin Williams', 'Tom Hanks'], correct: 3 },

  { id: 'm-m-009', category: 'movies', difficulty: 'medium',
    question: 'Who plays the Joker opposite Michael Keaton\'s Batman in Batman (1989)?',
    options: ['Jim Carrey', 'Jack Nicholson', 'Tommy Lee Jones', 'Cesar Romero'], correct: 1 },

  { id: 'm-m-010', category: 'movies', difficulty: 'medium',
    question: 'In Speed (1994), what is the minimum speed the bomb-rigged bus must maintain?',
    options: ['30 mph', '40 mph', '60 mph', '50 mph'], correct: 3 },

  { id: 'm-m-011', category: 'movies', difficulty: 'medium',
    question: 'Who plays Kevin Spacey\'s character in The Usual Suspects (1995)?',
    options: ['Dean Keaton', 'McManus', 'Todd Hockney', 'Verbal Kint'], correct: 3 },

  { id: 'm-m-012', category: 'movies', difficulty: 'medium',
    question: 'Who plays Morpheus in The Matrix (1999)?',
    options: ['Samuel L. Jackson', 'Denzel Washington', 'Laurence Fishburne', 'Wesley Snipes'], correct: 2 },

  { id: 'm-m-013', category: 'movies', difficulty: 'medium',
    question: 'What 1994 film won Best Picture at the Academy Awards, starring Tom Hanks in a lawyer role?',
    options: ['The Firm', 'Forrest Gump', 'Philadelphia', 'A Few Good Men'], correct: 1 },

  { id: 'm-m-014', category: 'movies', difficulty: 'medium',
    question: 'Who plays William Wallace in Braveheart (1995)?',
    options: ['Russell Crowe', 'Liam Neeson', 'Kevin Costner', 'Mel Gibson'], correct: 3 },

  { id: 'm-m-015', category: 'movies', difficulty: 'medium',
    question: 'Who directed Pulp Fiction (1994)?',
    options: ['Robert Rodriguez', 'John Woo', 'Bryan Singer', 'Quentin Tarantino'], correct: 3 },

  { id: 'm-m-016', category: 'movies', difficulty: 'medium',
    question: 'In Good Will Hunting (1997), who plays the therapist Sean Maguire?',
    options: ['Matt Damon', 'Ben Affleck', 'Robin Williams', 'Stellan Skarsgård'], correct: 2 },

  { id: 'm-m-017', category: 'movies', difficulty: 'medium',
    question: 'What 1997 film stars Will Smith and Tommy Lee Jones as secret agents who police aliens?',
    options: ['Bad Boys', 'Enemy of the State', 'Men in Black', 'Wild Wild West'], correct: 2 },

  { id: 'm-m-018', category: 'movies', difficulty: 'medium',
    question: 'In Schindler\'s List (1993), what colour stands out in the otherwise black-and-white film?',
    options: ['Yellow', 'Blue', 'Red', 'Green'], correct: 2 },

  { id: 'm-m-019', category: 'movies', difficulty: 'medium',
    question: 'What 1986 Aliens director had Ripley battle the alien queen?',
    options: ['Ridley Scott', 'John McTiernan', 'James Cameron', 'Tony Scott'], correct: 2 },

  { id: 'm-m-020', category: 'movies', difficulty: 'medium',
    question: 'In The Shawshank Redemption (1994), what crime was Andy Dufresne convicted of?',
    options: ['Bank robbery', 'Tax evasion', 'Murdering his wife and her lover', 'Embezzlement'], correct: 2 },

  { id: 'm-m-021', category: 'movies', difficulty: 'medium',
    question: 'Who plays Henry Hill in Goodfellas (1990)?',
    options: ['Robert De Niro', 'Joe Pesci', 'Ray Liotta', 'Paul Sorvino'], correct: 2 },

  { id: 'm-m-022', category: 'movies', difficulty: 'medium',
    question: 'What 1994 film features the character of Hannibal Lecter AND Buffalo Bill?',
    options: ['Manhunter', 'The Silence of the Lambs', 'Red Dragon', 'Se7en'], correct: 1 },

  { id: 'm-m-023', category: 'movies', difficulty: 'medium',
    question: 'In Ferris Bueller\'s Day Off (1986), what city do Ferris and his friends visit for the day?',
    options: ['New York', 'Los Angeles', 'Chicago', 'Boston'], correct: 2 },

  { id: 'm-m-024', category: 'movies', difficulty: 'medium',
    question: 'What 1991 thriller stars Sharon Stone in a famous interrogation scene?',
    options: ['Fatal Attraction', 'Basic Instinct', 'Single White Female', 'The Hand That Rocks the Cradle'], correct: 1 },

  { id: 'm-m-025', category: 'movies', difficulty: 'medium',
    question: 'Who directed Schindler\'s List (1993)?',
    options: ['Martin Scorsese', 'Oliver Stone', 'Milos Forman', 'Steven Spielberg'], correct: 3 },

  // --- HARD (15) ---
  { id: 'm-h-001', category: 'movies', difficulty: 'hard',
    question: 'In Back to the Future (1985), what is the name of Doc Brown\'s dog?',
    options: ['Copernicus', 'Einstein', 'Darwin', 'Newton'], correct: 1 },

  { id: 'm-h-002', category: 'movies', difficulty: 'hard',
    question: 'What year is the original Blade Runner (1982) set in?',
    options: ['2020', '2030', '2025', '2019'], correct: 3 },

  { id: 'm-h-003', category: 'movies', difficulty: 'hard',
    question: 'Who was originally cast as Marty McFly in Back to the Future before Michael J. Fox replaced him?',
    options: ['Rob Lowe', 'John Cusack', 'Eric Stoltz', 'C. Thomas Howell'], correct: 2 },

  { id: 'm-h-004', category: 'movies', difficulty: 'hard',
    question: 'In The Silence of the Lambs (1991), what is Buffalo Bill\'s real name?',
    options: ['Francis Dolarhyde', 'Mason Verger', 'Jame Gumb', 'Paul Krendler'], correct: 2 },

  { id: 'm-h-005', category: 'movies', difficulty: 'hard',
    question: 'What composer wrote the Ghostbusters (1984) theme song?',
    options: ['Harold Faltermeyer', 'John Williams', 'Ray Parker Jr.', 'Billy Joel'], correct: 2 },

  { id: 'm-h-006', category: 'movies', difficulty: 'hard',
    question: 'In The Fugitive (1993), what is the name of the one-armed man that Dr. Richard Kimble hunts?',
    options: ['Nichols', 'Hennessey', 'Copeland', 'Sykes'], correct: 3 },

  { id: 'm-h-007', category: 'movies', difficulty: 'hard',
    question: 'What actor plays Tommy DeVito in Goodfellas (1990)?',
    options: ['Robert De Niro', 'Paul Sorvino', 'Ray Liotta', 'Joe Pesci'], correct: 3 },

  { id: 'm-h-008', category: 'movies', difficulty: 'hard',
    question: 'In which 1985 John Hughes film does Judd Nelson play the rebel John Bender?',
    options: ['Sixteen Candles', 'Weird Science', 'The Breakfast Club', 'Ferris Bueller\'s Day Off'], correct: 2 },

  { id: 'm-h-009', category: 'movies', difficulty: 'hard',
    question: 'What is the destination planet designation in Aliens (1986) where the colony is located?',
    options: ['LV-223', 'Acheron Prime', 'Xenon-7', 'LV-426'], correct: 3 },

  { id: 'm-h-010', category: 'movies', difficulty: 'hard',
    question: 'In The Big Lebowski (1998), what is "The Dude\'s" real first name?',
    options: ['Walter', 'Theodore', 'Jeffrey', 'Lawrence'], correct: 2 },

  { id: 'm-h-011', category: 'movies', difficulty: 'hard',
    question: 'Who directed This Is Spinal Tap (1984)?',
    options: ['John Hughes', 'Joel Coen', 'Rob Reiner', 'Mike Nichols'], correct: 2 },

  { id: 'm-h-012', category: 'movies', difficulty: 'hard',
    question: 'In Unforgiven (1992), what is Clint Eastwood\'s character\'s real name?',
    options: ['Bill Daggett', 'English Bob', 'Ned Logan', 'William Munny'], correct: 3 },

  { id: 'm-h-013', category: 'movies', difficulty: 'hard',
    question: 'What film won the Academy Award for Best Picture at the 1988 ceremony (for films of 1987)?',
    options: ['Platoon', 'Full Metal Jacket', 'The Last Emperor', 'Broadcast News'], correct: 2 },

  { id: 'm-h-014', category: 'movies', difficulty: 'hard',
    question: 'In Reservoir Dogs (1992), who is Mr. Blonde?',
    options: ['Harvey Keitel', 'Steve Buscemi', 'Tim Roth', 'Michael Madsen'], correct: 3 },

  { id: 'm-h-015', category: 'movies', difficulty: 'hard',
    question: 'Who played Verbal Kint\'s lawyer in The Usual Suspects (1995)?',
    options: ['Pete Postlethwaite', 'Gabriel Byrne', 'Benicio del Toro', 'Kevin Pollak'], correct: 0 },

  // =========================================
  // TV SHOWS  (40 questions)
  // =========================================

  // --- EASY (15) ---
  { id: 'tv-e-001', category: 'tv', difficulty: 'easy',
    question: 'In which US city is the bar in Cheers located?',
    options: ['New York', 'Chicago', 'Philadelphia', 'Boston'], correct: 3 },

  { id: 'tv-e-002', category: 'tv', difficulty: 'easy',
    question: 'What animated TV show is set in the fictional town of Springfield?',
    options: ['Family Guy', 'Futurama', 'The Simpsons', 'American Dad'], correct: 2 },

  { id: 'tv-e-003', category: 'tv', difficulty: 'easy',
    question: 'In Friends, what is the name of the coffee shop where the gang hangs out?',
    options: ['The Grind', 'Central Perk', 'Perks', 'Java Joe\'s'], correct: 1 },

  { id: 'tv-e-004', category: 'tv', difficulty: 'easy',
    question: 'In Star Trek: The Next Generation, who is the captain of the Enterprise?',
    options: ['James T. Kirk', 'Benjamin Sisko', 'Jonathan Archer', 'Jean-Luc Picard'], correct: 3 },

  { id: 'tv-e-005', category: 'tv', difficulty: 'easy',
    question: 'What TV show follows FBI agents Mulder and Scully investigating paranormal cases?',
    options: ['Twin Peaks', 'Millennium', 'Unsolved Mysteries', 'The X-Files'], correct: 3 },

  { id: 'tv-e-006', category: 'tv', difficulty: 'easy',
    question: 'What is the name of the family in Married... with Children?',
    options: ['Conner', 'Lambert', 'Barone', 'Bundy'], correct: 3 },

  { id: 'tv-e-007', category: 'tv', difficulty: 'easy',
    question: 'Who plays Will Smith\'s character in The Fresh Prince of Bel-Air?',
    options: ['DJ Jazzy Jeff', 'Alfonso Ribeiro', 'James Avery', 'Will Smith'], correct: 3 },

  { id: 'tv-e-008', category: 'tv', difficulty: 'easy',
    question: 'What show features the catchphrase "D\'oh!"?',
    options: ['South Park', 'Futurama', 'Family Guy', 'The Simpsons'], correct: 3 },

  { id: 'tv-e-009', category: 'tv', difficulty: 'easy',
    question: 'In which 1980s show does Tom Selleck play private investigator Thomas Magnum in Hawaii?',
    options: ['Hawaii Five-O', 'Simon & Simon', 'Hunter', 'Magnum P.I.'], correct: 3 },

  { id: 'tv-e-010', category: 'tv', difficulty: 'easy',
    question: 'What TV show features the Tanner family living in San Francisco?',
    options: ['Family Ties', 'Growing Pains', 'Step by Step', 'Full House'], correct: 3 },

  { id: 'tv-e-011', category: 'tv', difficulty: 'easy',
    question: 'In MacGyver, what everyday item does the hero famously use to solve problems (besides a Swiss Army knife)?',
    options: ['Duct tape', 'A paperclip', 'A shoelace', 'Chewing gum'], correct: 1 },

  { id: 'tv-e-012', category: 'tv', difficulty: 'easy',
    question: 'What show has the theme song "Where Everybody Knows Your Name"?',
    options: ['Wings', 'Friends', 'Frasier', 'Cheers'], correct: 3 },

  { id: 'tv-e-013', category: 'tv', difficulty: 'easy',
    question: 'In Seinfeld, what is George Costanza\'s father\'s first name?',
    options: ['Frank', 'Morty', 'Herb', 'Al'], correct: 0 },

  { id: 'tv-e-014', category: 'tv', difficulty: 'easy',
    question: 'What 1980s show starred Mr. T as B.A. Baracus?',
    options: ['Knight Rider', 'Airwolf', 'The A-Team', 'Magnum P.I.'], correct: 2 },

  { id: 'tv-e-015', category: 'tv', difficulty: 'easy',
    question: 'In Breaking Bad, what subject does Walter White teach before becoming a drug manufacturer?',
    options: ['Biology', 'Chemistry', 'Physics', 'Mathematics'], correct: 1 },

  // --- MEDIUM (15) ---
  { id: 'tv-m-001', category: 'tv', difficulty: 'medium',
    question: 'In Friends, how many times does Ross Geller get divorced?',
    options: ['Once', 'Twice', 'Four times', 'Three times'], correct: 3 },

  { id: 'tv-m-002', category: 'tv', difficulty: 'medium',
    question: 'What famous cliffhanger question came from the TV show Dallas in 1980?',
    options: ['"Who killed Laura Palmer?"', '"Who shot J.R.?"', '"Who is A?"', '"Who is the Zodiac?"'], correct: 1 },

  { id: 'tv-m-003', category: 'tv', difficulty: 'medium',
    question: 'In The Simpsons, what is the name of Bart\'s teacher?',
    options: ['Elizabeth Hoover', 'Patty Bouvier', 'Selma Bouvier', 'Edna Krabappel'], correct: 3 },

  { id: 'tv-m-004', category: 'tv', difficulty: 'medium',
    question: 'In Seinfeld, what is the fake name George Costanza often gives people?',
    options: ['Buck Naked', 'H.E. Pennypacker', 'Art Vandelay', 'John Willoughby'], correct: 2 },

  { id: 'tv-m-005', category: 'tv', difficulty: 'medium',
    question: 'In Star Trek: The Next Generation, what is the name of Data\'s pet cat?',
    options: ['Pixel', 'Byte', 'Chip', 'Spot'], correct: 3 },

  { id: 'tv-m-006', category: 'tv', difficulty: 'medium',
    question: 'What is Al Bundy\'s occupation in Married... with Children?',
    options: ['Plumber', 'Car mechanic', 'Garbage collector', 'Shoe salesman'], correct: 3 },

  { id: 'tv-m-007', category: 'tv', difficulty: 'medium',
    question: 'In Saved by the Bell, what is the name of the high school the characters attend?',
    options: ['West Beverly High', 'Valley High', 'Beverly Hills High', 'Bayside High'], correct: 3 },

  { id: 'tv-m-008', category: 'tv', difficulty: 'medium',
    question: 'What is the A-Team\'s leader Hannibal Smith\'s famous catchphrase?',
    options: ['"Crazy enough to work"', '"On the jazz"', '"Pity the fool"', '"I love it when a plan comes together"'], correct: 3 },

  { id: 'tv-m-009', category: 'tv', difficulty: 'medium',
    question: 'In The X-Files, what is Agent Fox Mulder\'s sister\'s name?',
    options: ['Diana', 'Samantha', 'Melissa', 'Karen'], correct: 1 },

  { id: 'tv-m-010', category: 'tv', difficulty: 'medium',
    question: 'What 1990s detective show starred Angela Lansbury as mystery writer Jessica Fletcher?',
    options: ['Columbo', 'Diagnosis Murder', 'Matlock', 'Murder, She Wrote'], correct: 3 },

  { id: 'tv-m-011', category: 'tv', difficulty: 'medium',
    question: 'In Frasier, what radio station does Frasier Crane work at in Seattle?',
    options: ['KPIX', 'KBLL', 'KFYI', 'KACL'], correct: 3 },

  { id: 'tv-m-012', category: 'tv', difficulty: 'medium',
    question: 'What is the name of Uncle Jesse\'s band in Full House?',
    options: ['Beach Boyz', 'The Rippers', 'Jesse and the Rippers', 'Uncle Jesse\'s Boys'], correct: 2 },

  { id: 'tv-m-013', category: 'tv', difficulty: 'medium',
    question: 'In Twin Peaks (1990), what is the name of the murder victim around whom the plot revolves?',
    options: ['Donna Hayward', 'Audrey Horne', 'Laura Palmer', 'Shelly Johnson'], correct: 2 },

  { id: 'tv-m-014', category: 'tv', difficulty: 'medium',
    question: 'In Seinfeld, what is the Soup Nazi\'s strict rule?',
    options: ['"One bowl per customer"', '"No credit cards"', '"No talking"', '"No soup for you"'], correct: 3 },

  { id: 'tv-m-015', category: 'tv', difficulty: 'medium',
    question: 'What actor played Norm Peterson in Cheers?',
    options: ['John Ratzenberger', 'Ted Danson', 'Kelsey Grammer', 'George Wendt'], correct: 3 },

  // --- HARD (10) ---
  { id: 'tv-h-001', category: 'tv', difficulty: 'hard',
    question: 'What was the original working title of the Seinfeld pilot episode?',
    options: ['Nothing Happens', 'Pilot', 'The Show About Nothing', 'The Seinfeld Chronicles'], correct: 3 },

  { id: 'tv-h-002', category: 'tv', difficulty: 'hard',
    question: 'In Cheers, what is Norm Peterson\'s rarely-seen wife\'s name?',
    options: ['Diane', 'Rebecca', 'Lilith', 'Vera'], correct: 3 },

  { id: 'tv-h-003', category: 'tv', difficulty: 'hard',
    question: 'What actress replaced Shelley Long as the female lead in Cheers?',
    options: ['Rhea Perlman', 'Bebe Neuwirth', 'Julia Sweeney', 'Kirstie Alley'], correct: 3 },

  { id: 'tv-h-004', category: 'tv', difficulty: 'hard',
    question: 'In The Simpsons, what is the name of the nuclear power plant Homer works at?',
    options: ['Shelbyville Nuclear Plant', 'Springfield Energy Corp', 'Sector 7G', 'Springfield Nuclear Power Plant'], correct: 3 },

  { id: 'tv-h-005', category: 'tv', difficulty: 'hard',
    question: 'What was the name of the character played by John Cleese in the British sitcom Fawlty Towers?',
    options: ['Fawlty', 'Basil Fawlty', 'Manuel', 'Polly'], correct: 1 },

  { id: 'tv-h-006', category: 'tv', difficulty: 'hard',
    question: 'In which year did the finale of M*A*S*H air, making it one of the most-watched US TV events?',
    options: ['1980', '1981', '1983', '1985'], correct: 2 },

  { id: 'tv-h-007', category: 'tv', difficulty: 'hard',
    question: 'In The Fresh Prince of Bel-Air, what is Will\'s full character name?',
    options: ['William Smith', 'Will Banks', 'William Adams', 'Will "The Fresh Prince" Smith'], correct: 1 },

  { id: 'tv-h-008', category: 'tv', difficulty: 'hard',
    question: 'What is the name of the bar in Roseanne where the Conner family often drinks?',
    options: ['The Lanford Grill', 'Roseanne\'s', 'The Lunch Box', 'The Lobo Lounge'], correct: 3 },

  { id: 'tv-h-009', category: 'tv', difficulty: 'hard',
    question: 'On Baywatch, what is David Hasselhoff\'s character\'s full name?',
    options: ['Mitch Pearson', 'Craig Pomeroy', 'Mitch Buchannon', 'Eddie Kramer'], correct: 2 },

  { id: 'tv-h-010', category: 'tv', difficulty: 'hard',
    question: 'What US state is the setting of Northern Exposure (1990–1995)?',
    options: ['Montana', 'Alaska', 'Wyoming', 'Idaho'], correct: 1 },

  // =========================================
  // SCI-FI  (35 questions)
  // =========================================

  // --- EASY (10) ---
  { id: 'sf-e-001', category: 'scifi', difficulty: 'easy',
    question: 'In 2001: A Space Odyssey, what is the name of the murderous AI computer?',
    options: ['WOPR', 'Skynet', 'JARVIS', 'HAL 9000'], correct: 3 },

  { id: 'sf-e-002', category: 'scifi', difficulty: 'easy',
    question: 'Who wrote the novel Dune?',
    options: ['Isaac Asimov', 'Arthur C. Clarke', 'Frank Herbert', 'Ray Bradbury'], correct: 2 },

  { id: 'sf-e-003', category: 'scifi', difficulty: 'easy',
    question: 'In Alien (1979), what is the name of the spaceship the crew travels on?',
    options: ['Sulaco', 'Covenant', 'Discovery One', 'Nostromo'], correct: 3 },

  { id: 'sf-e-004', category: 'scifi', difficulty: 'easy',
    question: 'What is the answer to life, the universe and everything in The Hitchhiker\'s Guide to the Galaxy?',
    options: ['Pi', '0', '42', 'Infinity'], correct: 2 },

  { id: 'sf-e-005', category: 'scifi', difficulty: 'easy',
    question: 'In Star Trek, what is the home planet of the Vulcans?',
    options: ['Romulus', 'Qo\'noS', 'Bajor', 'Vulcan'], correct: 3 },

  { id: 'sf-e-006', category: 'scifi', difficulty: 'easy',
    question: 'Who wrote The Hitchhiker\'s Guide to the Galaxy?',
    options: ['Terry Pratchett', 'Douglas Adams', 'Robert Heinlein', 'Philip K. Dick'], correct: 1 },

  { id: 'sf-e-007', category: 'scifi', difficulty: 'easy',
    question: 'What 1982 Ridley Scott film features a cop hunting artificial humans called "replicants"?',
    options: ['Total Recall', 'RoboCop', 'Blade Runner', 'The Running Man'], correct: 2 },

  { id: 'sf-e-008', category: 'scifi', difficulty: 'easy',
    question: 'In Doctor Who, what does the Doctor travel in?',
    options: ['A wormhole gate', 'The TARDIS', 'A time sphere', 'The DeLorean'], correct: 1 },

  { id: 'sf-e-009', category: 'scifi', difficulty: 'easy',
    question: 'Who wrote I, Robot and the Foundation series?',
    options: ['Arthur C. Clarke', 'Ray Bradbury', 'Isaac Asimov', 'Philip K. Dick'], correct: 2 },

  { id: 'sf-e-010', category: 'scifi', difficulty: 'easy',
    question: 'In Independence Day (1996), which US landmark is the first to be destroyed by the aliens?',
    options: ['Statue of Liberty', 'Golden Gate Bridge', 'The White House', 'Empire State Building'], correct: 2 },

  // --- MEDIUM (15) ---
  { id: 'sf-m-001', category: 'scifi', difficulty: 'medium',
    question: 'What is the name of the test used to identify replicants in Blade Runner (1982)?',
    options: ['Turing Test', 'Voight-Kampff Test', 'Antigen Screen', 'Patel Protocol'], correct: 1 },

  { id: 'sf-m-002', category: 'scifi', difficulty: 'medium',
    question: 'In Aliens (1986), on what planet designation does the story take place?',
    options: ['LV-223', 'Acheron Prime', 'Xenon-7', 'LV-426'], correct: 3 },

  { id: 'sf-m-003', category: 'scifi', difficulty: 'medium',
    question: 'What does TARDIS stand for?',
    options: ['Temporal And Reality Displacement In Space', 'Time And Relative Dimension In Space', 'Transient Anomaly Relay Detection Integration System', 'Tachyon Assisted Relative Dimensional Interface System'], correct: 1 },

  { id: 'sf-m-004', category: 'scifi', difficulty: 'medium',
    question: 'Who wrote Neuromancer, the foundational cyberpunk novel published in 1984?',
    options: ['Philip K. Dick', 'Bruce Sterling', 'Neal Stephenson', 'William Gibson'], correct: 3 },

  { id: 'sf-m-005', category: 'scifi', difficulty: 'medium',
    question: 'What is the name of Ender Wiggin\'s enemy species in Ender\'s Game by Orson Scott Card?',
    options: ['The Swarm', 'The Buggers (Formics)', 'The Skitters', 'The Combine'], correct: 1 },

  { id: 'sf-m-006', category: 'scifi', difficulty: 'medium',
    question: 'In Star Wars, on what forest moon do the Ewoks live?',
    options: ['Dagobah', 'Bespin', 'Endor', 'Yavin 4'], correct: 2 },

  { id: 'sf-m-007', category: 'scifi', difficulty: 'medium',
    question: 'What is the name of the spaceship in Joss Whedon\'s Firefly?',
    options: ['Serenity', 'Reavers', 'Destiny', 'Tranquility'], correct: 0 },

  { id: 'sf-m-008', category: 'scifi', difficulty: 'medium',
    question: 'Who wrote Fahrenheit 451?',
    options: ['George Orwell', 'Aldous Huxley', 'Ray Bradbury', 'Kurt Vonnegut'], correct: 2 },

  { id: 'sf-m-009', category: 'scifi', difficulty: 'medium',
    question: 'Who created the original Star Trek television series in 1966?',
    options: ['George Lucas', 'J.J. Abrams', 'Rod Serling', 'Gene Roddenberry'], correct: 3 },

  { id: 'sf-m-010', category: 'scifi', difficulty: 'medium',
    question: 'In Total Recall (1990), which planet does Arnold Schwarzenegger\'s character have implanted memories of visiting?',
    options: ['Jupiter', 'Venus', 'Mars', 'Saturn'], correct: 2 },

  { id: 'sf-m-011', category: 'scifi', difficulty: 'medium',
    question: 'Who wrote the novel that became the film Minority Report?',
    options: ['Michael Crichton', 'William Gibson', 'Arthur C. Clarke', 'Philip K. Dick'], correct: 3 },

  { id: 'sf-m-012', category: 'scifi', difficulty: 'medium',
    question: 'In the Terminator films, what is the name of the AI that starts the nuclear war?',
    options: ['HAL', 'VIKI', 'Skynet', 'SHODAN'], correct: 2 },

  { id: 'sf-m-013', category: 'scifi', difficulty: 'medium',
    question: 'What is the first law of Asimov\'s Three Laws of Robotics?',
    options: ['A robot must protect its own existence', 'A robot must obey orders', 'A robot may not injure a human being, or allow one to come to harm', 'A robot may not deceive a human'], correct: 2 },

  { id: 'sf-m-014', category: 'scifi', difficulty: 'medium',
    question: 'In The Hitchhiker\'s Guide to the Galaxy, what is the name of Zaphod Beeblebrox\'s ship?',
    options: ['Vogon Constructor', 'Bistromath', 'Heart of Gold', 'Total Perspective Vortex'], correct: 2 },

  { id: 'sf-m-015', category: 'scifi', difficulty: 'medium',
    question: 'What year did George Orwell\'s novel "1984" first publish?',
    options: ['1945', '1948', '1949', '1952'], correct: 2 },

  // --- HARD (10) ---
  { id: 'sf-h-001', category: 'scifi', difficulty: 'hard',
    question: 'In Frank Herbert\'s Dune, what is the name of the drug that extends life and enables space travel?',
    options: ['Soma', 'Spice (Melange)', 'Soothe', 'Mélange Bleu'], correct: 1 },

  { id: 'sf-h-002', category: 'scifi', difficulty: 'hard',
    question: 'In Hari Seldon\'s Foundation (Isaac Asimov), what is the name of the science he develops?',
    options: ['Futurology', 'Psychohistory', 'Predictomatics', 'Sociodynamics'], correct: 1 },

  { id: 'sf-h-003', category: 'scifi', difficulty: 'hard',
    question: 'In William Gibson\'s Neuromancer, what is the name of the AI that Case is hired to free?',
    options: ['Neuromancer', 'Molly', 'Wintermute', 'Dixie Flatline'], correct: 2 },

  { id: 'sf-h-004', category: 'scifi', difficulty: 'hard',
    question: 'In Ursula K. Le Guin\'s "The Left Hand of Darkness", on what planet does the story take place?',
    options: ['Urras', 'Anarres', 'Hain', 'Gethen'], correct: 3 },

  { id: 'sf-h-005', category: 'scifi', difficulty: 'hard',
    question: 'Who wrote "Brave New World" (1932)?',
    options: ['George Orwell', 'H.G. Wells', 'Aldous Huxley', 'E.M. Forster'], correct: 2 },

  { id: 'sf-h-006', category: 'scifi', difficulty: 'hard',
    question: 'In Star Trek, what is the name of the treaty that established a neutral zone between the Federation and the Romulan Star Empire?',
    options: ['Khitomer Accords', 'Treaty of Algeron', 'Organian Treaty', 'Bajoran Accords'], correct: 1 },

  { id: 'sf-h-007', category: 'scifi', difficulty: 'hard',
    question: 'What is the name of the generation ship in Arthur C. Clarke\'s "Rendezvous with Rama"?',
    options: ['Odyssey', 'Discovery', 'Endeavour', 'Rama'], correct: 3 },

  { id: 'sf-h-008', category: 'scifi', difficulty: 'hard',
    question: 'In the Alien franchise, what is the name of the android in the original 1979 film?',
    options: ['David', 'Bishop', 'Walter', 'Ash'], correct: 3 },

  { id: 'sf-h-009', category: 'scifi', difficulty: 'hard',
    question: 'What 1973 Michael Crichton film preceded Jurassic Park with a similar "theme park gone wrong" concept?',
    options: ['Soylent Green', 'THX 1138', 'Westworld', 'Logan\'s Run'], correct: 2 },

  { id: 'sf-h-010', category: 'scifi', difficulty: 'hard',
    question: 'In Stanisław Lem\'s Solaris, what does the ocean on the planet Solaris do to the crew?',
    options: ['Kills them slowly', 'Reads their minds and creates physical manifestations', 'Speaks to them telepathically', 'Converts them into energy'], correct: 1 },

  // =========================================
  // FANTASY  (35 questions)
  // =========================================

  // --- EASY (10) ---
  { id: 'fa-e-001', category: 'fantasy', difficulty: 'easy',
    question: 'Who wrote The Lord of the Rings?',
    options: ['C.S. Lewis', 'J.R.R. Tolkien', 'George R.R. Martin', 'Terry Pratchett'], correct: 1 },

  { id: 'fa-e-002', category: 'fantasy', difficulty: 'easy',
    question: 'In The Lord of the Rings, what is the name of the all-powerful ring that Frodo must destroy?',
    options: ['The Ring of Power', 'The One Ring', 'Sauron\'s Ring', 'The Dark Ring'], correct: 1 },

  { id: 'fa-e-003', category: 'fantasy', difficulty: 'easy',
    question: 'Who wrote the Harry Potter series?',
    options: ['Stephenie Meyer', 'Rick Riordan', 'J.K. Rowling', 'Philip Pullman'], correct: 2 },

  { id: 'fa-e-004', category: 'fantasy', difficulty: 'easy',
    question: 'What is the name of the dragon in The Hobbit?',
    options: ['Falkor', 'Saphira', 'Draco', 'Smaug'], correct: 3 },

  { id: 'fa-e-005', category: 'fantasy', difficulty: 'easy',
    question: 'In The Lord of the Rings, what is the name of Gandalf\'s magnificent horse?',
    options: ['Roach', 'Artax', 'Asfaloth', 'Shadowfax'], correct: 3 },

  { id: 'fa-e-006', category: 'fantasy', difficulty: 'easy',
    question: 'Who wrote A Song of Ice and Fire (the books behind Game of Thrones)?',
    options: ['Robert Jordan', 'Brandon Sanderson', 'Terry Goodkind', 'George R.R. Martin'], correct: 3 },

  { id: 'fa-e-007', category: 'fantasy', difficulty: 'easy',
    question: 'In Harry Potter, what Hogwarts house is Harry sorted into?',
    options: ['Slytherin', 'Ravenclaw', 'Hufflepuff', 'Gryffindor'], correct: 3 },

  { id: 'fa-e-008', category: 'fantasy', difficulty: 'easy',
    question: 'In The Lord of the Rings, what is the elven kingdom ruled by Elrond?',
    options: ['Lórien', 'Mirkwood', 'Rivendell', 'Edoras'], correct: 2 },

  { id: 'fa-e-009', category: 'fantasy', difficulty: 'easy',
    question: 'Who wrote The Chronicles of Narnia series?',
    options: ['J.R.R. Tolkien', 'Lloyd Alexander', 'Susan Cooper', 'C.S. Lewis'], correct: 3 },

  { id: 'fa-e-010', category: 'fantasy', difficulty: 'easy',
    question: 'What 1985 fantasy film features David Bowie as the Goblin King?',
    options: ['Willow', 'The Princess Bride', 'Legend', 'Labyrinth'], correct: 3 },

  // --- MEDIUM (15) ---
  { id: 'fa-m-001', category: 'fantasy', difficulty: 'medium',
    question: 'In The Lord of the Rings, what is the Elvish word for "friend" that opens the Mines of Moria?',
    options: ['Aiya', 'Elen', 'Valar', 'Mellon'], correct: 3 },

  { id: 'fa-m-002', category: 'fantasy', difficulty: 'medium',
    question: 'Who wrote the Discworld series of comic fantasy novels?',
    options: ['Neil Gaiman', 'Terry Pratchett', 'Douglas Adams', 'Tom Holt'], correct: 1 },

  { id: 'fa-m-003', category: 'fantasy', difficulty: 'medium',
    question: 'In Terry Pratchett\'s Discworld, what creature carries the world on its back?',
    options: ['A giant crab', 'A cosmic whale', 'A great tortoise (the Great A\'Tuin)', 'An enormous elephant'], correct: 2 },

  { id: 'fa-m-004', category: 'fantasy', difficulty: 'medium',
    question: 'In A Song of Ice and Fire (Game of Thrones), what is the name of the Stark family\'s ancestral Valyrian steel sword?',
    options: ['Longclaw', 'Oathkeeper', 'Heartsbane', 'Ice'], correct: 3 },

  { id: 'fa-m-005', category: 'fantasy', difficulty: 'medium',
    question: 'Who wrote the His Dark Materials trilogy (starting with The Golden Compass)?',
    options: ['Ursula K. Le Guin', 'Susan Cooper', 'Philip Pullman', 'Diana Wynne Jones'], correct: 2 },

  { id: 'fa-m-006', category: 'fantasy', difficulty: 'medium',
    question: 'In Tolkien\'s mythology, who is the dark lord that precedes Sauron as the first Dark Lord?',
    options: ['Saruman', 'Ungoliant', 'Glaurung', 'Morgoth'], correct: 3 },

  { id: 'fa-m-007', category: 'fantasy', difficulty: 'medium',
    question: 'What is the name of Daenerys Targaryen\'s largest dragon in Game of Thrones?',
    options: ['Viserion', 'Rhaegal', 'Balerion', 'Drogon'], correct: 3 },

  { id: 'fa-m-008', category: 'fantasy', difficulty: 'medium',
    question: 'In Robert Jordan\'s Wheel of Time, what is the name of the main protagonist (the Dragon Reborn)?',
    options: ['Perrin Aybara', 'Mat Cauthon', 'Lan Mandragoran', 'Rand al\'Thor'], correct: 3 },

  { id: 'fa-m-009', category: 'fantasy', difficulty: 'medium',
    question: 'What is the name of the magic school in the Harry Potter universe?',
    options: ['Ilvermorny', 'Durmstrang', 'Beauxbatons', 'Hogwarts'], correct: 3 },

  { id: 'fa-m-010', category: 'fantasy', difficulty: 'medium',
    question: 'Who wrote "The Name of the Wind" (The Kingkiller Chronicle)?',
    options: ['Brandon Sanderson', 'Joe Abercrombie', 'Scott Lynch', 'Patrick Rothfuss'], correct: 3 },

  { id: 'fa-m-011', category: 'fantasy', difficulty: 'medium',
    question: 'In The Princess Bride (1987), what is Inigo Montoya\'s famous repeated line?',
    options: ['"You keep using that word. I do not think it means what you think it means."',
               '"As you wish."',
               '"My name is Inigo Montoya. You killed my father. Prepare to die."',
               '"Inconceivable!"'], correct: 2 },

  { id: 'fa-m-012', category: 'fantasy', difficulty: 'medium',
    question: 'In the Narnia series, what is the name of the White Witch?',
    options: ['Morgause', 'The Lady of the Green Kirtle', 'Lilith', 'Jadis'], correct: 3 },

  { id: 'fa-m-013', category: 'fantasy', difficulty: 'medium',
    question: 'In The Wizard of Earthsea by Ursula K. Le Guin, what is the magical rule about speaking names?',
    options: ['Names must be earned in battle', 'To know a thing\'s true name is to have power over it', 'Names must never be spoken aloud', 'Names fade when spoken too often'], correct: 1 },

  { id: 'fa-m-014', category: 'fantasy', difficulty: 'medium',
    question: 'What is the name of Gandalf\'s sword?',
    options: ['Sting', 'Anduril', 'Herugrim', 'Glamdring'], correct: 3 },

  { id: 'fa-m-015', category: 'fantasy', difficulty: 'medium',
    question: 'In the 1988 Ron Howard film Willow, what is the name of the powerful sorceress villain?',
    options: ['Fin Raziel', 'Queen Bavmorda', 'Sorsha', 'The Enchantress'], correct: 1 },

  // --- HARD (10) ---
  { id: 'fa-h-001', category: 'fantasy', difficulty: 'hard',
    question: 'What year was "The Lord of the Rings: The Fellowship of the Ring" (the book) first published?',
    options: ['1937', '1948', '1960', '1954'], correct: 3 },

  { id: 'fa-h-002', category: 'fantasy', difficulty: 'hard',
    question: 'What is the magic system called in Brandon Sanderson\'s Mistborn series?',
    options: ['Stormlight', 'Awakening', 'Aons', 'Allomancy'], correct: 3 },

  { id: 'fa-h-003', category: 'fantasy', difficulty: 'hard',
    question: 'In Terry Pratchett\'s Discworld, what is the name of Death\'s horse?',
    options: ['Epona', 'Shadowfax', 'Roach', 'Binky'], correct: 3 },

  { id: 'fa-h-004', category: 'fantasy', difficulty: 'hard',
    question: 'In C.S. Lewis\'s Space Trilogy, what is the Malacandrian name for Earth?',
    options: ['Perelandra', 'Thulcandra', 'Malacandra', 'Glundandra'], correct: 1 },

  { id: 'fa-h-005', category: 'fantasy', difficulty: 'hard',
    question: 'In The Wheel of Time, what is the name of the crystal sword at the Stone of Tear that only the Dragon Reborn can wield?',
    options: ['Justice', 'The Sword That Cannot Be Touched', 'Perrin\'s Axe', 'Callandor'], correct: 3 },

  { id: 'fa-h-006', category: 'fantasy', difficulty: 'hard',
    question: 'Who wrote "Gardens of the Moon", the first book in the Malazan Book of the Fallen?',
    options: ['Joe Abercrombie', 'Steven Erikson', 'Robin Hobb', 'Glen Cook'], correct: 1 },

  { id: 'fa-h-007', category: 'fantasy', difficulty: 'hard',
    question: 'In George R.R. Martin\'s world, what are the words (motto) of House Stark?',
    options: ['"Fire and Blood"', '"Ours Is the Fury"', '"Hear Me Roar"', '"Winter Is Coming"'], correct: 3 },

  { id: 'fa-h-008', category: 'fantasy', difficulty: 'hard',
    question: 'In Tolkien\'s Silmarillion, what are the Silmarils?',
    options: ['Sacred swords of the elves', 'Three jewels containing the light of the Two Trees', 'The seven palantíri', 'The names of the first elves'], correct: 1 },

  { id: 'fa-h-009', category: 'fantasy', difficulty: 'hard',
    question: 'Who wrote "The First Law" trilogy, beginning with "The Blade Itself" (2006)?',
    options: ['Mark Lawrence', 'Scott Lynch', 'Peter V. Brett', 'Joe Abercrombie'], correct: 3 },

  { id: 'fa-h-010', category: 'fantasy', difficulty: 'hard',
    question: 'In Tolkien\'s mythology, how many Istari (wizards) are sent to Middle-earth?',
    options: ['Three', 'Seven', 'Five', 'Nine'], correct: 2 },

  // =========================================
  // GENERAL KNOWLEDGE  (30 questions)
  // =========================================

  // --- EASY (10) ---
  { id: 'gk-e-001', category: 'general', difficulty: 'easy',
    question: 'What is the capital city of France?',
    options: ['Lyon', 'Marseille', 'Paris', 'Nice'], correct: 2 },

  { id: 'gk-e-002', category: 'general', difficulty: 'easy',
    question: 'How many planets are in our solar system (as of the 2006 IAU definition)?',
    options: ['7', '9', '8', '10'], correct: 2 },

  { id: 'gk-e-003', category: 'general', difficulty: 'easy',
    question: 'What is the chemical symbol for gold?',
    options: ['Go', 'Gd', 'Ag', 'Au'], correct: 3 },

  { id: 'gk-e-004', category: 'general', difficulty: 'easy',
    question: 'Who painted the Mona Lisa?',
    options: ['Michelangelo', 'Raphael', 'Leonardo da Vinci', 'Donatello'], correct: 2 },

  { id: 'gk-e-005', category: 'general', difficulty: 'easy',
    question: 'What is the largest ocean on Earth?',
    options: ['Indian Ocean', 'Arctic Ocean', 'Atlantic Ocean', 'Pacific Ocean'], correct: 3 },

  { id: 'gk-e-006', category: 'general', difficulty: 'easy',
    question: 'In what year did World War II end?',
    options: ['1943', '1944', '1946', '1945'], correct: 3 },

  { id: 'gk-e-007', category: 'general', difficulty: 'easy',
    question: 'Who wrote Romeo and Juliet?',
    options: ['Charles Dickens', 'Geoffrey Chaucer', 'John Milton', 'William Shakespeare'], correct: 3 },

  { id: 'gk-e-008', category: 'general', difficulty: 'easy',
    question: 'What gas do plants absorb from the atmosphere during photosynthesis?',
    options: ['Oxygen', 'Nitrogen', 'Hydrogen', 'Carbon dioxide'], correct: 3 },

  { id: 'gk-e-009', category: 'general', difficulty: 'easy',
    question: 'What is the capital city of Australia?',
    options: ['Melbourne', 'Sydney', 'Brisbane', 'Canberra'], correct: 3 },

  { id: 'gk-e-010', category: 'general', difficulty: 'easy',
    question: 'How many sides does a hexagon have?',
    options: ['5', '7', '8', '6'], correct: 3 },

  // --- MEDIUM (12) ---
  { id: 'gk-m-001', category: 'general', difficulty: 'medium',
    question: 'What is the chemical symbol for silver?',
    options: ['Si', 'Sl', 'Sv', 'Ag'], correct: 3 },

  { id: 'gk-m-002', category: 'general', difficulty: 'medium',
    question: 'Who was the first person to walk on the Moon?',
    options: ['Buzz Aldrin', 'Yuri Gagarin', 'Alan Shepard', 'Neil Armstrong'], correct: 3 },

  { id: 'gk-m-003', category: 'general', difficulty: 'medium',
    question: 'Which country has the most natural lakes in the world?',
    options: ['United States', 'Finland', 'Russia', 'Canada'], correct: 3 },

  { id: 'gk-m-004', category: 'general', difficulty: 'medium',
    question: 'Who is widely credited with inventing the telephone in 1876?',
    options: ['Thomas Edison', 'Nikola Tesla', 'Guglielmo Marconi', 'Alexander Graham Bell'], correct: 3 },

  { id: 'gk-m-005', category: 'general', difficulty: 'medium',
    question: 'In what year did the Berlin Wall fall?',
    options: ['1987', '1991', '1990', '1989'], correct: 3 },

  { id: 'gk-m-006', category: 'general', difficulty: 'medium',
    question: 'What is the longest river in Africa?',
    options: ['Congo River', 'Zambezi River', 'Niger River', 'Nile River'], correct: 3 },

  { id: 'gk-m-007', category: 'general', difficulty: 'medium',
    question: 'Who wrote "Pride and Prejudice"?',
    options: ['Emily Brontë', 'Charlotte Brontë', 'George Eliot', 'Jane Austen'], correct: 3 },

  { id: 'gk-m-008', category: 'general', difficulty: 'medium',
    question: 'What is the hardest natural substance on Earth?',
    options: ['Quartz', 'Topaz', 'Corundum', 'Diamond'], correct: 3 },

  { id: 'gk-m-009', category: 'general', difficulty: 'medium',
    question: 'In what year was the Eiffel Tower completed?',
    options: ['1885', '1901', '1895', '1889'], correct: 3 },

  { id: 'gk-m-010', category: 'general', difficulty: 'medium',
    question: 'What is the atomic number of carbon?',
    options: ['8', '4', '12', '6'], correct: 3 },

  { id: 'gk-m-011', category: 'general', difficulty: 'medium',
    question: 'Which country hosted the 1980 Summer Olympics?',
    options: ['United States', 'West Germany', 'Soviet Union (Moscow)', 'China'], correct: 2 },

  { id: 'gk-m-012', category: 'general', difficulty: 'medium',
    question: 'What is the name of the world\'s largest desert by area?',
    options: ['Gobi Desert', 'Sahara Desert', 'Arabian Desert', 'Antarctic Desert'], correct: 3 },

  // --- HARD (8) ---
  { id: 'gk-h-001', category: 'general', difficulty: 'hard',
    question: 'In what year was the Magna Carta signed?',
    options: ['1199', '1225', '1265', '1215'], correct: 3 },

  { id: 'gk-h-002', category: 'general', difficulty: 'hard',
    question: 'Who was the first female Prime Minister of the United Kingdom?',
    options: ['Theresa May', 'Margaret Thatcher', 'Barbara Castle', 'Shirley Williams'], correct: 1 },

  { id: 'gk-h-003', category: 'general', difficulty: 'hard',
    question: 'What is Avogadro\'s number (to 4 significant figures)?',
    options: ['6.626 × 10⁻³⁴', '1.602 × 10⁻¹⁹', '6.022 × 10²³', '3.141 × 10⁸'], correct: 2 },

  { id: 'gk-h-004', category: 'general', difficulty: 'hard',
    question: 'What is the speed of sound in dry air at 20°C (approximately)?',
    options: ['243 m/s', '443 m/s', '343 m/s', '543 m/s'], correct: 2 },

  { id: 'gk-h-005', category: 'general', difficulty: 'hard',
    question: 'The Battle of Hastings (1066) was fought between Harold II and which invading force?',
    options: ['Danish Vikings', 'The Norman French under William the Conqueror', 'The Visigoths', 'Scottish forces under Malcolm III'], correct: 1 },

  { id: 'gk-h-006', category: 'general', difficulty: 'hard',
    question: 'What is the chemical formula for table salt?',
    options: ['KCl', 'MgCl₂', 'CaCl₂', 'NaCl'], correct: 3 },

  { id: 'gk-h-007', category: 'general', difficulty: 'hard',
    question: 'Which element has the highest melting point of all known elements?',
    options: ['Osmium', 'Iridium', 'Rhenium', 'Tungsten'], correct: 3 },

  { id: 'gk-h-008', category: 'general', difficulty: 'hard',
    question: 'In what year was the United Nations officially founded?',
    options: ['1943', '1946', '1948', '1945'], correct: 3 },

];

export default questions;
