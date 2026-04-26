const moons = [
    [1, "Long Journey's End", "Darker", "https://mario.wiki.gallery/images/3/36/SMO_Shot_-_Darker_Side.jpg"],
    [2, "A Traditional Festival", "Metro", "https://mario.wiki.gallery/images/0/05/SMO_Metro_Moon_7.png"],
    [3, "Showdown at Bowser's Castle", "Bowser's", "https://mario.wiki.gallery/images/0/00/ShowdownatBowserCastle.png"],
    [4, "Bench Friends", "Metro", "https://mario.wiki.gallery/images/d/d7/SMO_Metro_Moon_26.png"],
    [5, "Loose-Tile Trackdown", "Mushroom", "https://mario.wiki.gallery/images/b/bf/SMO_Mushroom_Moon_26.png"],
    [6, "Across the Mysterious Clouds", "Cascade", "https://mario.wiki.gallery/images/f/fd/SMO_Cascade_Moon_37.png"],
    [7, "Waves of Poison: Hop to It!", "Lake", "https://mario.wiki.gallery/images/0/05/SMO_Lake_Moon_42.png"],
    [8, "Volcano Cave Cruisin'", "Luncheon", "https://mario.wiki.gallery/images/7/7c/SMO_Luncheon_Moon_65.png"],
    [9, "Jump, Grab, and Climb Some More", "Lake", "https://mario.wiki.gallery/images/9/96/SMO_Lake_Moon_25.png"],
    [10, "All the Cracks are Fixed", "Luncheon", "https://mario.wiki.gallery/images/0/07/SMO_Luncheon_Moon_22.png"],
    [11, "Searching the Frog Pond", "Cap", "https://mario.wiki.gallery/images/1/1b/SMO_Cap_Moon_10.png"],
    [12, "Luncheon Kingdom Koopa Freerunning", "Luncheon", "https://mario.wiki.gallery/images/2/24/SMO_Luncheon_Moon_55.png"],
    [12, "Scaling Pitchblack Mountain", "Metro", "https://mario.wiki.gallery/images/8/8b/SMO_Metro_Moon_76.png"],
    [12, "Hey Out There, Captain Toad!", "Wooded", "https://mario.wiki.gallery/images/e/e9/SMO_Wooded_Moon_20.png"],
    [15, "Volcano Cave and Mysterious  Clouds", "Luncheon", "https://mario.wiki.gallery/images/d/d6/SMO_Luncheon_Moon_66.png"],
    [16, "Waves of Poison: Hoppin' Over", "Lake", "https://mario.wiki.gallery/images/d/d7/SMO_Lake_Moon_41.png"],
    [17, "The Forgotten Treasure", "Cap", "https://mario.wiki.gallery/images/4/40/SMO_Cap_Moon_12.png"],
    [18, "Secrets of the Frog Pond", "Cap", "https://mario.wiki.gallery/images/f/f0/SMO_Cap_Moon_11.png"],
    [19, "Bowser's Kingdom Koopa Freerunning", "Bowser's", "https://mario.wiki.gallery/images/9/94/SMO_Bowser%27s_Moon_41.png"],
    [20, "Wooded Kingdom Koopa Freerunning", "Wooded", "https://mario.wiki.gallery/images/2/2a/SMO_Wooded_Moon_69.png"],
    [20, "Atop a Wall Among the Clouds", "Cascade", "https://mario.wiki.gallery/images/9/9d/SMO_Cascade_Moon_38.png"],
    [22, "Jump, Grab, Cling and Climb", "Lake", "https://mario.wiki.gallery/images/3/37/SMO_Lake_Moon_24.png"],
    [23, "Up on the Big Screen", "Metro", "https://mario.wiki.gallery/images/a/a1/SMO_Metro_Moon_64.png"],
    [24, "Breakdown Road: Final Challenge!", "Dark", "https://mario.wiki.gallery/images/d/d1/SMO_Dark_Side_Moon_4.png"],
    [24, "Twist 'n' Turn-Up Treasure", "Lost", "https://mario.wiki.gallery/images/d/db/SMO_Lost_Moon_17.png"],
    [26, "Metro Kingdom Koopa Freerunning", "Metro", "https://mario.wiki.gallery/images/f/f0/SMO_Metro_Moon_74.png"],
    [27, "Soaring Over Forgotten Isle!", "Lost", "https://mario.wiki.gallery/images/6/60/SMO_Lost_Moon_18.png"],
    [28, "Our First Power Moon", "Cascade", "https://mario.wiki.gallery/images/a/ae/SMO_Cascade_Moon_1.png"],
    [29, "RC Car Challenge", "Metro", "https://mario.wiki.gallery/images/6/67/SMO_Metro_Moon_73.png"],
    [29, "How Do They Take Out the Trash?", "Metro", "https://mario.wiki.gallery/images/1/16/SMO_Metro_Moon_18.png"],
    [31, "Spinning Athletics End Goal", "Luncheon", "https://mario.wiki.gallery/images/2/2b/SMO_Luncheon_Moon_45.png"],
    [31, "Cave Gardening", "Lost", "https://mario.wiki.gallery/images/0/0c/SMO_Lost_Moon_14.png"],
    [33, "Breakdown Road: Hurry!", "Dark", "https://mario.wiki.gallery/images/1/19/SMO_Dark_Side_Moon_3.png"],
    [33, "The Bullet Bill Maze: Break Through!", "Sand", "https://mario.wiki.gallery/images/4/49/SMO_Sand_Moon_56.png"], // get better image
    [35, "Fork Flickin' to the Summit", "Luncheon", "https://mario.wiki.gallery/images/5/51/SMO_Luncheon_Moon_41.png"],
    [35, "Mario Signs His Name", "Metro", "https://mario.wiki.gallery/images/f/fd/SMO_Metro_Moon_55.png"],
    [37, "Princess Peach, Home Again!", "Mushroom", "https://mario.wiki.gallery/images/b/b0/SMO_Mushroom_Moon_43.png"],
    [37, "Totally Classic!", "Mushroom", "https://mario.wiki.gallery/images/5/5f/SMO_Mushroom_Moon_27.png"], // get better image
    [37, "The Bound Bowl Grand Prix", "Snow", "https://mario.wiki.gallery/images/6/62/SMO_Snow_Moon_5.png"],
    [37, "'Round-the-World Tourist", "Sand", "https://mario.wiki.gallery/images/9/96/SMO_Sand_Moon_68.png"],
    [41, "Courtyard Chest Trap", "Mushroom", "https://mario.wiki.gallery/images/a/a0/SMO_Mushroom_Moon_28.png"], // get better image?
    [41, "Diving from the Big Pot!", "Luncheon", "https://mario.wiki.gallery/images/1/14/SMO_Luncheon_Moon_53.png"],
    [41, "A Request from the Mayor", "Metro", "https://mario.wiki.gallery/images/f/fb/SMO_Metro_Moon_57.png"],
    [44, "Arrival at Rabbit Ridge!", "Dark", "https://mario.wiki.gallery/images/9/9b/Arrival_at_Rabbit_Ridge.png"],
    [44, "Climb the Wooden Tower", "Bowser's", "https://mario.wiki.gallery/images/b/bb/SMO_Bowser%27s_Moon_61.png"],
    [44, "Showdown on the Inverted Pyramid", "Sand", "https://mario.wiki.gallery/images/e/e0/SMO_Sand_Moon_3.png"],
    [47, "Taking Notes: In the Private Room", "Metro", "https://mario.wiki.gallery/images/3/37/SMO_Metro_Moon_33.png"],
    [47, "Spin the Hat, Get a Prize", "Cap", "https://mario.wiki.gallery/images/c/c6/SMO_Cap_Moon_22.png"],
    [49, "Unzip the Chasm", "Lake", "https://mario.wiki.gallery/images/8/89/SMO_Lake_Moon_22.png"], // get better image
    [50, "Ice Cave Treasure", "Sand", "https://mario.wiki.gallery/images/f/fa/SMO_Sand_Moon_50.png"],
    [51, "Taking Notes: Stretch and Shrink", "Lost", "https://mario.wiki.gallery/images/8/88/SMO_Lost_Moon_29.png"],
    [52, "Wandering Cactus", "Sand", "https://mario.wiki.gallery/images/d/db/SMO_Sand_Moon_40.png"],
    [53, "Battle with the Lord of Lightning!", "Ruined", "https://mario.wiki.gallery/images/b/bc/SMO_Ruined_Dragon_Preparing_Attack.png"],
    [53, "Flying Far Away from Gusty Bridges", "Cascade", "https://mario.wiki.gallery/images/c/ca/SMO_Cascade_Moon_40.png"],
    [55, "Taking Notes: Spinning Athletics", "Luncheon", "https://mario.wiki.gallery/images/4/48/SMO_Luncheon_Moon_46.png"],
    [55, "Free Parking: Leap of Faith", "Metro", "https://mario.wiki.gallery/images/5/5f/SMO_Metro_Moon_60.png"],
    [57, "Left at the Café?", "Metro", "https://mario.wiki.gallery/images/b/b7/SMO_Metro_Moon_16.png"],
    [58, "Poke! Roll!", "Seaside", "https://mario.wiki.gallery/images/8/86/SMO_Seaside_Moon_69.png"], // get better image
    [59, "Sunken Treasure in the Cloud Sea", "Seaside", "https://mario.wiki.gallery/images/c/c6/SMO_Seaside_Moon_44.png"], // better image
    [60, "The Sixth Face", "Cloud", "https://mario.wiki.gallery/images/2/27/SMO_Cloud_Moon_9.png"], // better image?
    [61, 'Good Morning, Captain Toad!', '', 'https://mario.wiki.gallery/images/d/d7/SMO_Cascade_Moon_11.png'],
    [61, 'King of the Cube!', '', 'https://mario.wiki.gallery/images/4/42/SMO_Cloud_Moon_8.png'],
    [63, 'The Hole in the Desert', '', 'https://mario.wiki.gallery/images/6/65/SMO_Sand_Moon_4.png'],
    [63, 'Up in the Rafters', '', 'https://mario.wiki.gallery/images/1/1d/SMO_Moon_Moon_14.png'],
    [65, 'Welcome Back, Jaxi!', '', 'https://mario.wiki.gallery/images/5/5b/SMO_Sand_Moon_39.png'],
    [66, 'Strange Neighborhood', '', 'https://mario.wiki.gallery/images/8/80/SMO_Sand_Moon_60.png'],
    [67, 'Very Nice Shot with the Chain Chomp!', '', 'https://mario.wiki.gallery/images/9/9c/SMO_Cascade_Moon_15.png'], // better image
    [68, 'Get Some Rest, Captain Toad', '', 'https://mario.wiki.gallery/images/d/d3/SMO_Lost_Moon_20.png'],
    [69, 'Beneath the Roots of the Moving Tree', '', 'https://mario.wiki.gallery/images/c/c7/SMO_Wooded_Moon_34.png'],
    [70, 'Remotely Captured Car', '', 'https://mario.wiki.gallery/images/b/b9/SMO_Metro_Moon_31.png'],
    [71, 'Our Secret Little Room', '', 'https://mario.wiki.gallery/images/e/ee/SMO_Lake_Moon_17.png'],
    [71, 'Taking Notes: In the Folding Screen', '', 'https://mario.wiki.gallery/images/1/14/SMO_Bowser%27s_Moon_32.png'],
    [71, 'Treasure of the Waterfall Basin', '', 'https://mario.wiki.gallery/images/c/c5/SMO_Cascade_Moon_6.png'],
    [74, 'Line It Up, Blow It Up', '', 'https://mario.wiki.gallery/images/2/2a/SMO_Lost_Moon_28.png'],
    [75, 'Thanks for the Charge!', '', 'https://mario.wiki.gallery/images/c/cb/SMO_Wooded_Moon_9.png'],
    [76, 'Beneath the Rolling Vegetables', '', 'https://mario.wiki.gallery/images/7/72/SMO_Luncheon_Moon_21.png'],
    [77, 'The Treasure of Jaxi Ruins', '', 'https://mario.wiki.gallery/images/8/8d/SMO_Sand_Moon_24.png'], // better image
    [77, 'Under the Bowser Statue', '', 'https://mario.wiki.gallery/images/e/ec/SMO_Moon_Moon_9.png'],
    [77, 'Bon Appétit, Captain Toad!', '', 'https://mario.wiki.gallery/images/5/59/SMO_Luncheon_Moon_33.png'],
    [80, 'Cascade Kingdom Koopa Freerunning', '', 'https://mario.wiki.gallery/images/5/5b/SMO_Cascade_Moon_36.png'],
    [81, 'Back Way Up the Mountain', '', 'https://mario.wiki.gallery/images/e/e9/SMO_Wooded_Moon_6.png'],
    [81, 'City Hall Lost & Found', '', 'https://mario.wiki.gallery/images/9/97/SMO_Metro_Moon_34.png'],
    [83, 'Precision Rolling', '', 'https://mario.wiki.gallery/images/a/a2/SMO_Cap_Moon_31.png'],
    [83, 'Iceburn Circuit', '', 'https://mario.wiki.gallery/images/4/4b/SMO_Snow_Moon_53.png'],
    [85, 'Employees Only', '', 'https://mario.wiki.gallery/images/7/7c/SMO_Sand_Moon_43.png'],
    [85, 'Underground Treasure Chest', '', 'https://mario.wiki.gallery/images/8/8d/SMO_Sand_Moon_47.png'],
    [87, 'Good Evening, Captain Toad!', '', 'https://mario.wiki.gallery/images/5/57/SMO_Cap_Moon_4.png'],
    [88, 'Below Breakdown Road', '', 'https://mario.wiki.gallery/images/e/ed/SMO_Wooded_Moon_76.png'], // better image
    [89, 'Cap Kingdom Koopa Freerunning', '', 'https://mario.wiki.gallery/images/b/bd/SMO_Cap_Moon_15.png'],
    [90, "Fork Flickin' Detour", '', 'https://mario.wiki.gallery/images/a/ab/SMO_Luncheon_Moon_42.png'],
    [91, 'Motor Scooter: Escape!', '', 'https://mario.wiki.gallery/images/5/57/SMO_Metro_Moon_49.png'], // better image
    [92, 'Roll On and On', '', 'https://mario.wiki.gallery/images/0/0b/SMO_Cap_Moon_30.png'],
    [93, 'Sinking Colossal Ruins: Hurry!', '', 'https://mario.wiki.gallery/images/d/d1/SMO_Sand_Moon_87.png'],
    [94, "How You Doin', Captain Toad?", '', 'https://mario.wiki.gallery/images/e/e0/SMO_Metro_Moon_24.png'],
    [95, 'Dashing Above and Beyond!', '', 'https://mario.wiki.gallery/images/8/8d/SMO_Snow_Moon_25.png'], // better image?
    [96, 'Across the Gusty Bridges', '', 'https://mario.wiki.gallery/images/b/b0/SMO_Cascade_Moon_39.png'],
    [97, 'Taking Notes with a Spinning Throw', '', 'https://mario.wiki.gallery/images/f/f2/SMO_Bowser%27s_Moon_55.png'],
    [98, 'Light from the Ceiling', '', 'https://mario.wiki.gallery/images/5/52/SMO_Mushroom_Moon_25.png'],
    [99, 'Dizzying Heights', '', 'https://mario.wiki.gallery/images/9/9d/SMO_Metro_Moon_12.png'],
    [101, 'Down and Up the Spinning Tower', '', 'https://mario.wiki.gallery/images/3/3e/SMO_Bowser%27s_Moon_34.png'],
    [102, '2D Boost from Bullet Bill', '', 'https://mario.wiki.gallery/images/a/aa/SMO_Mushroom_Moon_32.png'],
    [102, 'Bullet Billding', '', 'https://mario.wiki.gallery/images/5/5e/SMO_Metro_Moon_47.png'], // better image
    [104, 'Dashing Over Cold Water!', '', 'https://mario.wiki.gallery/images/1/17/SMO_Snow_Moon_24.png'], // better image
    [105, 'Golden Turnip Recipe 2', '', 'https://mario.wiki.gallery/images/7/77/SMO_Luncheon_Moon_16.png'],
    [106, 'Invader in the Sky Garden', '', 'https://mario.wiki.gallery/images/e/e1/SMO_Wooded_Moon_63.png'],
    [106, 'Surprise Clown!', '', 'https://mario.wiki.gallery/images/8/86/SMO_Metro_Moon_56.png'],
    [106, 'Spinning-Platforms Treasure', '', 'https://mario.wiki.gallery/images/0/05/SMO_Wooded_Moon_26.png'],
    [109, 'The Caged Gold', '', 'https://mario.wiki.gallery/images/a/ab/SMO_Lost_Moon_19.png'], // BETTER IMAGE
    [110, 'Metro Kingdom Timer Challenge 1', '', 'https://mario.wiki.gallery/images/c/cb/SMO_Metro_Moon_19.png'], // better image
    [110, 'A Successful Repair Job', '', 'https://mario.wiki.gallery/images/2/20/SMO_Lake_Moon_20.png'], // better image
    [112, 'Captain Toad on the Dark Side!', '', 'https://mario.wiki.gallery/images/e/ee/SMO_Dark_Side_Moon_2.png'], //
    [113, 'Full-Throttle Scooting!', '', 'https://mario.wiki.gallery/images/d/d8/SMO_Metro_Moon_81.png'], //
    [114, "New Donk City's Pest Problem", '', 'https://mario.wiki.gallery/images/8/8f/SMO_Metro_Moon_1.png'],
    [115, 'Free Parking: Rooftop Hop', '', 'https://mario.wiki.gallery/images/3/37/SMO_Metro_Moon_25.png'],
    [116, 'Making the Secret Flower Field Bloom', '', 'https://mario.wiki.gallery/images/7/77/SMO_Wooded_Moon_27.png'],
    [116, 'Chomp Through the Rocks', '', 'https://mario.wiki.gallery/images/f/f4/SMO_Cascade_Moon_3.png'], //
    [118, 'I Feel Underdressed', '', 'https://mario.wiki.gallery/images/9/99/SMO_Lake_Moon_21.png'], //
    [119, 'Super-Secret Zipper', '', 'https://mario.wiki.gallery/images/8/87/SMO_Lake_Moon_23.png'], //
    [119, 'Moon Shards in the Sand', '', 'https://mario.wiki.gallery/images/4/42/SMO_Sand_Moon_2.png'], //
    [121, 'Above a Strange Neighborhood', '', 'https://mario.wiki.gallery/images/1/11/SMO_Sand_Moon_61.png'],
    [122, 'Hidden in the Scrap', '', 'https://mario.wiki.gallery/images/1/13/SMO_Metro_Moon_15.png'],
    [123, 'Ride the Jetstream', '', 'https://mario.wiki.gallery/images/0/02/SMO_Seaside_Moon_7.png'], //
    [124, 'On Top of the Stone Archway', '', 'https://mario.wiki.gallery/images/4/46/SMO_Sand_Moon_11.png'],
    [125, 'Defend the Secret Flower Field!', '', 'https://mario.wiki.gallery/images/4/44/SMO_Wooded_Moon_4.png'],
    [126, 'Rewiring the Neighborhood', '', 'https://mario.wiki.gallery/images/a/af/SMO_Metro_Moon_39.png'], //
    [127, 'Celebrating in the Streets!', '', 'https://mario.wiki.gallery/images/a/ae/SMO_Metro_Moon_36.png'], //
    [128, 'Past the Peculiar Pipes', '', 'https://mario.wiki.gallery/images/2/28/SMO_Wooded_Moon_30.png'], //
    [129, 'Wading in the Cloud Sea', '', 'https://mario.wiki.gallery/images/f/fa/SMO_Seaside_Moon_43.png'],
    [130, "I'm Not Cold!", '', 'https://mario.wiki.gallery/images/a/ae/SMO_Snow_Moon_20.png'],
    [131, 'The Shiverian Treasure Chest', '', 'https://mario.wiki.gallery/images/a/ab/SMO_Snow_Moon_11.png'],
    [132, 'Taking Notes: Snow Path Dash', '', 'https://mario.wiki.gallery/images/5/5b/SMO_Snow_Moon_16.png'],
    [133, 'Just a Hat, Skip, and a Jump', '', 'https://mario.wiki.gallery/images/b/b8/SMO_Cascade_Moon_27.png'],
    [134, 'Fly Through the Narrow Valley', '', 'https://mario.wiki.gallery/images/b/b8/SMO_Seaside_Moon_45.png'], //
    [135, 'Taking Notes: Big Pot Swim', '', 'https://mario.wiki.gallery/images/6/67/SMO_Luncheon_Moon_36.png'],
    [136, 'Stepping Over the Gears', '', 'https://mario.wiki.gallery/images/b/ba/SMO_Luncheon_Moon_63.png'], //
    [136, 'Lighthouse Leaper', '', 'https://mario.wiki.gallery/images/b/b9/SMO_Seaside_Moon_33.png'],
    [138, 'Lost in the Luggage', '', 'https://mario.wiki.gallery/images/8/84/SMO_Sand_Moon_18.png'],
    [138, 'Past the Moving Wall', '', 'https://mario.wiki.gallery/images/b/bd/SMO_Bowser%27s_Moon_9.png'], //
    [140, 'Tucked Away Inside the Tunnel', '', 'https://mario.wiki.gallery/images/4/4e/SMO_Wooded_Moon_11.png'], //
    [141, 'Down Inside the Big Screen', '', 'https://mario.wiki.gallery/images/3/33/SMO_Metro_Moon_65.png'],
    [142, 'Vaulting up a High-Rise', '', 'https://mario.wiki.gallery/images/3/32/SMO_Metro_Moon_46.png'],
    [143, 'Magma Narrow Path', '', 'https://mario.wiki.gallery/images/d/d5/SMO_Luncheon_Moon_39.png'],
    [143, 'Poster Cleanup', '', 'https://mario.wiki.gallery/images/5/5b/SMO_Sand_Moon_78.png'],
    [145, 'Lake Kingdom Koopa Freerunning', '', 'https://mario.wiki.gallery/images/7/74/SMO_Lake_Moon_32.png'],
    [145, 'Alcove in the Ruins', '', 'https://mario.wiki.gallery/images/d/d8/SMO_Sand_Moon_6.png'], //
    [145, 'Colossal Ruins: Dash! Jump!', '', 'https://mario.wiki.gallery/images/3/33/SMO_Sand_Moon_86.png'], //
    [145, 'Binding Band Returned', '', 'https://mario.wiki.gallery/images/9/91/SMO_Sand_Moon_67.png'],
    [149, 'High-Altitude Spinning', '', 'https://mario.wiki.gallery/images/9/90/SMO_Snow_Moon_32.png'], //
    [150, 'Reaching Pitchblack Island', '', 'https://mario.wiki.gallery/images/a/a5/SMO_Metro_Moon_77.png'],
    [151, 'Inside the Rotating Maze', '', 'https://mario.wiki.gallery/images/c/c1/SMO_Metro_Moon_43.png'], //
    [152, "Over the Cliff's Edge", '', 'https://mario.wiki.gallery/images/6/6a/SMO_Wooded_Moon_12.png'], ////////
    [153, 'Flying Over the Lava Islands', '', 'https://mario.wiki.gallery/images/a/ad/SMO_Luncheon_Moon_68.png'],
    [154, 'Powering Up the Station', '', 'https://mario.wiki.gallery/images/9/98/SMO_Metro_Moon_63.png'],
    [155, 'Invisible Road: Danger!', '', 'https://mario.wiki.gallery/images/c/c2/SMO_Wooded_Moon_71.png'],
    [156, 'Snow Kingdom Koopa Freerunning', '', 'https://mario.wiki.gallery/images/e/e5/SMO_Snow_Moon_35.png'],
    [157, 'The Glass Is Half Full!', '', 'https://mario.wiki.gallery/images/3/34/TheGlassisHalfEmpty.png'],
    [158, 'Atop the Tall Tree', '', 'https://mario.wiki.gallery/images/d/df/SMO_Wooded_Moon_10.png'],
    [159, 'Overlooking the Desert Town', '', 'https://mario.wiki.gallery/images/4/44/SMO_Sand_Moon_5.png'],
    [160, 'Hidden Chasm Passage', '', 'https://mario.wiki.gallery/images/f/f0/SMO_Cascade_Moon_17.png'],
    [161, 'Lost Kingdom Koopa Freerunning', '', 'https://mario.wiki.gallery/images/9/96/SMO_Lost_Moon_24.png'],
    [162, 'Toad Defender', '', 'https://mario.wiki.gallery/images/a/aa/SMO_Mushroom_Moon_17.png'],
    [163, "Secret Path to Peach's Castle!", '', 'https://mario.wiki.gallery/images/2/21/SMO_Mushroom_Moon_39.png'],
    [164, 'Merci, Dorrie!', '', 'https://mario.wiki.gallery/images/d/df/SMO_Seaside_Moon_14.png'],
    [165, 'Running the Flower Road', '', 'https://mario.wiki.gallery/images/f/fd/SMO_Snow_Moon_54.png'],
    [165, 'Wrecked Rock Block', '', 'https://mario.wiki.gallery/images/8/84/SMO_Lost_Moon_11.png'],
    [167, 'Taking Notes: Swimming in Magma', '', 'https://mario.wiki.gallery/images/a/ac/SMO_Luncheon_Moon_23.png'],
    [168, 'Big Broodal Battle', '', 'https://mario.wiki.gallery/images/a/ae/BigBroodalBattle.png'],
    [168, 'Swinging Scaffolding: Jump!', '', 'https://mario.wiki.gallery/images/8/8a/SMO_Metro_Moon_78.png'],
    [168, 'Ice-Dodging Goomba Stack', '', 'https://mario.wiki.gallery/images/2/2a/SMO_Snow_Moon_18.png'],
    [171, 'Lanterns on the Gear Steps', '', 'https://mario.wiki.gallery/images/3/3e/SMO_Luncheon_Moon_64.png'],
    [172, 'Above the Clouds', '', 'https://mario.wiki.gallery/images/6/6d/SMO_Wooded_Moon_48.png'],
    [173, 'Jump Onto the Transparent Lift', '', 'https://mario.wiki.gallery/images/f/f8/SMO_Sand_Moon_85.png'], //
    [173, 'Elevator Blind Spot', '', 'https://mario.wiki.gallery/images/6/66/SMO_Wooded_Moon_46.png'],
    [175, 'Among the Five Cactuses', '', 'https://mario.wiki.gallery/images/f/f4/SMO_Sand_Moon_36.png'],
    [176, 'Hat-and-Seek: In the Crowd', '', 'https://mario.wiki.gallery/images/8/82/SMO_Metro_Moon_75.png'],
    [177, 'Nice Shot with the Chain Chomp!', '', 'https://mario.wiki.gallery/images/a/a3/SMO_Cascade_Moon_14.png'], //
    [178, 'Found Behind Bars!', '', 'https://mario.wiki.gallery/images/9/90/SMO_Bowser%27s_Moon_26.png'], //
    [178, "On the Giant Bowser Statue's Nose", '', 'https://mario.wiki.gallery/images/d/de/SMO_Bowser%27s_Moon_13.png'],
    [180, 'Atop the Highest Tower', '', 'https://mario.wiki.gallery/images/8/86/SMO_Sand_Moon_1.png'],
    [181, 'Under the Cheese Rocks', '', 'https://mario.wiki.gallery/images/9/97/UndertheCheeseRocks.png'],
    [182, 'Taking Notes: In Low Gravity', '', 'https://mario.wiki.gallery/images/d/d9/SMO_Moon_Moon_34.png'],
    [183, 'Metro Kingdom Timer Challenge 2', '', 'https://mario.wiki.gallery/images/b/b6/SMO_Metro_Moon_20.png'],
    [184, 'Fly to the Treasure Chest and Back', '', 'https://mario.wiki.gallery/images/b/b2/SMO_Moon_Moon_13.png'],
    [184, 'Guarded by a Colossal Fossil', '', 'https://mario.wiki.gallery/images/2/29/SMO_Cascade_Moon_30.png'],
    [186, 'Jizo All in a Row', '', 'https://mario.wiki.gallery/images/e/e5/SMO_Bowser%27s_Moon_24.png'],
    [187, 'Inside the Busted Fossil', '', 'https://mario.wiki.gallery/images/a/ab/SMO_Cascade_Moon_33.png'], //
    [188, 'Chasing Klepto', '', 'https://mario.wiki.gallery/images/4/41/SMO_Lost_Moon_34.png'], //
    [189, 'Herding Sheep in the Dunes', '', 'https://mario.wiki.gallery/images/a/ac/SMO_Sand_Moon_33.png'],
    [190, 'Who Piled Garbage on This?', '', 'https://mario.wiki.gallery/images/b/bb/SMO_Metro_Moon_14.png'],
    [191, 'Smart Bombing', '', 'https://mario.wiki.gallery/images/4/4f/SmartBombing.png'], //
    [192, 'End of the Hidden Passage', '', 'https://mario.wiki.gallery/images/b/bf/SMO_Lake_Moon_4.png'], //
    [193, 'Jaxi Reunion!', '', 'https://mario.wiki.gallery/images/5/51/SMO_Sand_Moon_38.png'],
    [194, 'Moon Shards on the Moon', '', 'https://mario.wiki.gallery/images/c/c7/SMO_Moon_Moon_17.png'],
    [195, 'Motor Scooter Daredevil!', '', 'https://mario.wiki.gallery/images/3/3d/SMO_Metro_Moon_80.png'],
    [196, 'Down and Back Breakdown Road', '', 'https://mario.wiki.gallery/images/2/2c/SMO_Wooded_Moon_75.png'],
    [196, 'Dashing Above the Clouds', '', 'https://mario.wiki.gallery/images/7/7d/SMO_Bowser%27s_Moon_37.png'],
    [196, "Love at Peach's Castle", '', 'https://mario.wiki.gallery/images/f/fd/SMO_Mushroom_Moon_16.png'],
    [199, 'A Tourist in the Luncheon Kingdom', '', 'https://mario.wiki.gallery/images/e/ec/SMO_Luncheon_Moon_48.png'],
    [200, 'I Met a Tropical Wiggler!', '', 'https://mario.wiki.gallery/images/f/ff/SMO_Lost_Moon_23.png'],
    [201, 'Off the Beaten Wire', '', 'https://mario.wiki.gallery/images/9/93/SMO_Metro_Moon_40.png'],
    [202, 'Forgotten in the Holding Room', '', 'https://mario.wiki.gallery/images/f/f6/SMO_Snow_Moon_42.png'],
    [202, 'The Invisible Maze', '', 'https://mario.wiki.gallery/images/a/ae/SMO_Sand_Moon_54.png'], //
    [202, 'Hidden Among the Push-Blocks', '', 'https://mario.wiki.gallery/images/9/93/SMO_Cap_Moon_9.png'], //
    [205, 'Sand Kingdom Timer Challenge 1', '', 'https://mario.wiki.gallery/images/c/c0/SMO_Sand_Moon_28.png'],
    [205, 'Past the Chasm Lifts', '', 'https://mario.wiki.gallery/images/1/12/SMO_Cascade_Moon_16.png'],
    [207, 'Light the Two Flames', '', 'https://mario.wiki.gallery/images/e/e1/SMO_Luncheon_Moon_31.png'],
    [208, 'Hidden Corridor Under the Floor', '', 'https://mario.wiki.gallery/images/a/a4/SMO_Bowser%27s_Moon_20.png'],
    [209, 'Entrance to Shiveria', '', 'https://mario.wiki.gallery/images/c/cf/SMO_Snow_Moon_6.png'],
    [209, 'Invisible Road: Rush!', '', 'https://mario.wiki.gallery/images/7/7b/SMO_Dark_Side_Moon_5.png'],
    [211, "Invader in Bowser's Castle", '', 'https://mario.wiki.gallery/images/0/0a/SMO_Bowser%27s_Moon_51.png'],
    [212, 'Searching Hexagon Tower', '', 'https://mario.wiki.gallery/images/3/3e/SMO_Bowser%27s_Moon_59.png'],
    [212, 'Cookatiel Showdown!', '', 'https://mario.wiki.gallery/images/e/e0/SMO_Luncheon_Moon_5.png'],
    [214, 'Moon Shards Under Siege', '', 'https://mario.wiki.gallery/images/2/2a/SMO_Metro_Moon_41.png'], //
    [215, 'Dashing Through the Clouds', '', 'https://mario.wiki.gallery/images/5/53/SMO_Bowser%27s_Moon_38.png'],
    [216, 'Taking Notes: Up and Down', '', 'https://mario.wiki.gallery/images/8/83/SMO_Cloud_Moon_6.png'],
    [217, 'Poking the Turret Wall', '', 'https://mario.wiki.gallery/images/3/35/SMO_Bowser%27s_Moon_22.png'],
    [218, 'Invisible Road: Secret!', '', 'https://mario.wiki.gallery/images/8/8d/SMO_Dark_Side_Moon_6.png'],
    [218, 'Roulette Tower: Stopped', '', 'https://mario.wiki.gallery/images/6/66/SMO_Ruined_Moon_4.png'],
    [220, 'Across the Floating Isles', '', 'https://mario.wiki.gallery/images/1/1f/SMO_Cascade_Moon_8.png'],
    [221, 'In a Hole in the Magma', '', 'https://mario.wiki.gallery/images/2/26/SMO_Moon_Moon_10.png'],
    [222, 'Atop a Propeller Pillar', '', 'https://mario.wiki.gallery/images/a/a0/SMO_Lost_Moon_1.png'],
    [223, 'Hanging Between Buildings', '', 'https://mario.wiki.gallery/images/d/dd/SMO_Metro_Moon_67.png'], //
    [224, "Light the Far-Off Lanterns", '', 'https://mario.wiki.gallery/images/b/b4/SMO_Luncheon_Moon_32.png'],
    [224, "Ocean-Bottom Maze: Treasure", '', 'https://mario.wiki.gallery/images/b/b4/SMO_Seaside_Moon_8.png']
]


let availableMoons = moons;
// buttons for selecting higher
const leftHigherBtn = document.getElementById("leftHigherBtn");
const rightHigherBtn = document.getElementById("rightHigherBtn");
// displayed moon names
const leftMoonNameText = document.getElementById("leftMoonName");
const rightMoonNameText = document.getElementById("rightMoonName");
// displayed moon ranking
const leftMoonRankingText = document.getElementById("leftMoonRanking");
const rightMoonRankingText = document.getElementById("rightMoonRanking");
// displayed moon images
const leftMoonDisplayedImg = document.getElementById("leftOption");
const rightMoonDisplayedImg = document.getElementById("rightOption");
// track scores
const currentScoreText = document.getElementById("currentScore");
const highScoreText = document.getElementById("highScore");
const scoreBox = document.getElementById("scoreBox");
let currentScore = 0;
let highScore = 0;
// initialise moon variables
let leftMoon;
let rightMoon;
// for answering
let isCorrect;
let index;
let tempButtons;
let tempMoonStats;
// for rounds
const roundTimeDelay = 3000;
// for cookies
const statsExpiryDate = new Date(2145916800 * 1000)
// for game over
const gameOverDialogue = document.getElementById("gameOverDialogue");
const gameOverWrapper = document.querySelector(".gameOverWrapper");
const playAgainHomeBtn = document.getElementById("playAgainHomeBtn");
const finalScoreText = document.getElementById("finalScoreText");
// for info
const infoDialogue = document.getElementById("infoDialogue");
const infoWrapper = document.querySelector(".infoWrapper");


// return number with suffix
function getSuffix(i) {
    let j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}


// create a cookie
function setCookie(name, value, expiry){
    document.cookie = `${name}=${value}; expires=${expiry.toUTCString()}; path=/`
}
// returns value of given cookie
function getCookie(name){
    const cDecoded = decodeURIComponent(document.cookie); // grabs whole cookie
    const cArray = cDecoded.split("; "); // splits into array
    let result = null;
    // check each cookie for a match
    cArray.forEach(element => {
        if(element.indexOf(name) === 0){ // if element starts with desired cookie name
            result = element.substring(name.length + 1) // store value in result by going from index after name=
        }
    })
    return result;
}


function displayHighScore(){
    highScore = getCookie("highScore");
    if(highScore === null){
        setCookie("highScore", 0, statsExpiryDate)
        highScoreText.innerHTML = "Best: 0";
    }
    else{
        highScoreText.innerHTML = `Best: ${highScore}`;
    }
}


function getRandomLeftMoon(isFirstRound){
    leftMoon = availableMoons[Math.floor(Math.random()*availableMoons.length)];
    // ensure not the same moon
    while(leftMoon === rightMoon){
        leftMoon = availableMoons[Math.floor(Math.random()*availableMoons.length)];
    }
    // display left moon
    leftMoonNameText.textContent = leftMoon[1];
    leftMoonDisplayedImg.style.backgroundImage = `url(${leftMoon[3]})`;
    // load ranking
    leftMoonRankingText.innerHTML = `<mark>${getSuffix(leftMoon[0])}</mark>`
    // remove from available moons
    index = availableMoons.indexOf(leftMoon);
    if (index > -1) { // only splice array when item is found
        availableMoons.splice(index, 1); // 2nd parameter means remove one item only
    }
}
function getRandomRightMoon(){
    rightMoon = availableMoons[Math.floor(Math.random()*availableMoons.length)];
    // ensure not the same moon
    while(leftMoon === rightMoon){
        rightMoon = availableMoons[Math.floor(Math.random()*availableMoons.length)];
    }
    // display right moon
    rightMoonNameText.innerHTML = `${rightMoon[1]}`;
    rightMoonDisplayedImg.style.backgroundImage = `url(${rightMoon[3]})`;
    // load ranking
    rightMoonRankingText.innerHTML = `<mark>${getSuffix(rightMoon[0])}</mark>`
    // remove from available moons
    index = availableMoons.indexOf(rightMoon);
    if (index > -1) { // only splice array when item is found
        availableMoons.splice(index, 1); // 2nd parameter means remove one item only
    }
}

// select 2 random moons
function getBothRandomMoons(){
    getRandomLeftMoon(true);
    getRandomRightMoon();
}


function nextRound(side){
    if(availableMoons.length === 0){
        availableMoons = moons;
    }
    if(side === "right"){
        getRandomLeftMoon(false);
        showButtons("left");
    }
    else if(side === "left"){
        getRandomRightMoon();
        showButtons("right");
    }
}


function gameOver(){
    // update high score internally, don't display yet
    if(currentScore > getCookie("highScore")){
        setCookie("highScore", currentScore, statsExpiryDate);
    }
    finalScoreText.innerHTML = currentScore;
    openGameOverDialogue();
    playAgainHomeBtn.style.display = "initial";
}


function correctGuess(side){
    // update score
    currentScore++;
    currentScoreText.textContent = `Score: ${currentScore}`;
    // correct effects
    scoreBox.classList.add("correct");
    // start next round
    setTimeout(() => {
        scoreBox.classList.remove("correct");
        nextRound(side);
    }, roundTimeDelay);
}
function incorrectGuess(side){
    scoreBox.classList.add("incorrect");
    setTimeout(() => {
        scoreBox.classList.remove("incorrect");
        gameOver();
    }, roundTimeDelay);
}


function clickHigher(side){
    // check if was correct guess on corresponding side
    if(side === "left"){
        isCorrect = leftMoon[0] <= rightMoon[0];
        showRanking("left");
    }
    else if(side === "right"){
        isCorrect = rightMoon[0] <= leftMoon[0];
        showRanking("right");
    }

    if(isCorrect){
        correctGuess(side);
    }
    else{
        incorrectGuess(side);
    }
}
function clickLower(side){
    // check if was correct guess on corresponding side
    if(side === "left"){
        isCorrect = leftMoon[0] >= rightMoon[0];
        showRanking("left");
    }
    else if(side === "right"){
        isCorrect = rightMoon[0] >= leftMoon[0];
        showRanking("right");
    }

    if(isCorrect){
        correctGuess(side);
    }
    else{
        incorrectGuess(side);
    }
}


function showRanking(side){
    tempButtons = document.getElementById(`${side}Btns`);
    tempMoonStats = document.getElementById(`${side}MoonRanking`);
    tempButtons.style.display = "none";
    document.getElementById(`${side}MoonStats`).style.display = "initial";
    // animate ranking appearance
    tempMoonStats.classList.add("slide-up-class");
    setTimeout(() => {
        tempMoonStats.classList.remove("slide-up-class");
    }, 400);
}
function showButtons(side){
    tempButtons = document.getElementById(`${side}Btns`);
    tempMoonStats = document.getElementById(`${side}MoonStats`);
    tempButtons.style.display = "initial";
    tempMoonStats.style.display = "none";
    // animate button appearance
    tempButtons.classList.add("fade-in-class");
    setTimeout(() => {
        tempButtons.classList.remove("fade-in-class");
    }, 400);
}


let countdownRanking;
function runCountdown(textbox, start, end){
    return new Promise((resolve, reject) => {
        countdownRanking = setInterval(() => {
        // update countdown text
        if(start <= end){ // if finished
            textbox.innerHTML = `<mark>${getSuffix(start)}</mark>`;
            clearInterval(countdownRanking); // end JS timer
            resolve(true)
        }
        else{ // if not finished
            textbox.innerHTML = `<mark>${start}</mark>`;
            start--;
        }
        }, 1000/(start-end)) // makes it always take 1 second to count down
    })
    
}


function playAgain(){
    exitGameOverDialogue();
    // prepare scores
    currentScoreText.innerHTML = "Score: 0";
    currentScore = 0;
    displayHighScore();
    // start new game
    getBothRandomMoons();
    showRanking("left");
    showButtons("right");
    // remove play again button
    playAgainHomeBtn.style.display = "none";
}


// game over dialogue
// open / close game over dialogue
function openGameOverDialogue(){
    gameOverDialogue.showModal();
}
function exitGameOverDialogue(){
    gameOverDialogue.close();
}
// lets you close the dialogue by clicking anywhere outside of it
gameOverDialogue.addEventListener("click", (e) => {
    if(!gameOverWrapper.contains(e.target)){
        exitGameOverDialogue();
    }
});
// info dialogue
// open / close info dialogue
function openInfoDialogue(){
    infoDialogue.showModal();
}
function exitInfoDialogue(){
    infoDialogue.close();
}
// lets you close the dialogue by clicking anywhere outside of it
infoDialogue.addEventListener("click", (e) => {
    if(!infoWrapper.contains(e.target)){
        exitInfoDialogue();
    }
});


getBothRandomMoons();
showRanking("left");
showButtons("right");

displayHighScore();

playAgainHomeBtn.style.display = "none";