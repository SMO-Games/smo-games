import requests
from datetime import date
import json
import math
import pandas as pd


# base url that all links begin with
base = "https://www.speedrun.com/api/v1"

# ids for leaderboards and categories
mb_id = "76r55vd8"
ce_id = "m1mxxw46"

any_id = "w20w1lzd"
any_1p_var = "var-68km3w4l=zqoyz021"
any_2p_var = "var-68km3w4l=013vz03l"
mincapsany_id = "xd1gxz7d"

# opens dataframe for sovereignty of nation
sovereignty_df = pd.read_csv("countries.csv")


# convert dates from format provided by src (YYYY-MM-DD)
def convertDate(date_string):
    year = int(date_string[0:4])
    month = int(date_string[5:7])
    day = int(date_string[8:])
    return date(year, month, day)


# this whole function might be unnecessary, check (first returned pb = most recent ?)
def getMostRecentRun(base_url, runner_id, game_id):
    url = f"{base_url}/users/{runner_id}/personal-bests?game={game_id}"
    response = requests.get(url)

    if response.status_code == 200:
        
        pbs = response.json()
        pbs = pbs["data"]

        if len(pbs) == 0: # if no pbs in this game, back out
            return None

        # grabs first date for sake of comparison
        most_recent_date = convertDate(pbs[0]["run"]["date"])

        for pb in pbs:
            current_date = convertDate(pb["run"]["date"]) # grab date of current pb
            # separate date values
            if current_date > most_recent_date:
                most_recent_date = current_date
        
        return most_recent_date

    else:
        print(f"Failed to retrieve data {response.status_code}")


def getBestPlacement(base_url, runner_id, game_id):
    url = f"{base_url}/users/{runner_id}/personal-bests?game={game_id}"
    response = requests.get(url)

    if response.status_code == 200:
        
        pbs = response.json()
        pbs = pbs["data"]

        if len(pbs) == 0: # if no pbs in this game
            return (None, None)

        # declare variables -> set best_placement as first pb in list for sake of comparison
        best_placement = pbs[0]["place"]
        best_category = pbs[0]["run"]["category"]

        # TO DO: fix this, for some reason it can include obsolete runs and their former placement (i think?)
        # checks every pb to see if it has a new best placement
        for pb in pbs:
            # grabs placement and category
            current_place = pb["place"]
            current_category = pb["run"]["category"]

            # if new best placement, update variables
            if best_placement > current_place:
                best_placement = current_place
                best_category = current_category
        
        return (best_placement, best_category)

    else:
        print(f"Failed to retrieve data {response.status_code}")


def getRunnerData(base_url, runner_id):
    url = f"{base_url}/users/{runner_id}"
    response = requests.get(url)
    
    if response.status_code == 200:

        runner_data = response.json()
        runner_data = runner_data["data"] # everything gets stored in the data key for some reason lol
        runner_id = runner_data["id"]

        # gets runner location and saves it as none if there is no country selected
        runner_location = runner_data["location"]
        if runner_location != None:
            runner_location = runner_location["country"]
            country_code = runner_location["code"][:2]
            country_name = runner_location["names"]["international"]
            # get sovereignty of runner region
            sovereignty = sovereignty_df[sovereignty_df["Country_Code"] == country_code.upper()]
            sovereignty = sovereignty.Sovereignty.to_string()[-2:] # gets the final two characters which are the code
            # get continent of runner region
            continent = sovereignty_df[sovereignty_df["Country_Code"] == sovereignty]
            continent = continent.Continent_Code.to_string()[-2:]
        else:
            country_code = None
            country_name = None
            sovereignty = None
            continent = None
        

        # gets src username colour
        if runner_data["name-style"]["style"] == "gradient":
            name_colour = runner_data["name-style"]["color-to"]["dark"]
        elif runner_data["name-style"]["style"] == "solid":
            name_colour = runner_data["name-style"]["color"]["light"]

        # get twitter handle by removing url from twitter link
        twitter_handle = runner_data["twitter"]
        if twitter_handle != None: # if there is a twitter handle supplied
            twitter_handle = twitter_handle["uri"]
            twitter_handle = runner_data["twitter"]["uri"].replace("https://www.twitter.com/", "") # remove link
            twitter_handle.replace("https://www.x.com/", "") # just in case.

            if len(twitter_handle) > 16: # allowed length is 15, using 16 to be safe - catches anomalies
                twitter_handle = None

        # get twitch handle by removing url from twitch link
        twitch_handle = runner_data["twitch"]
        if twitch_handle != None:
            twitch_handle = twitch_handle["uri"].replace("https://www.twitch.tv/", "")

            if len(twitch_handle) > 26: # allowed length is 25, using 26 to be safe - catches anomalies
                twitch_handle = None

        # gets best placements
        best_mb_placement = getBestPlacement(base, runner_id, mb_id)
        best_ce_placement = getBestPlacement(base, runner_id, ce_id)

        # gets most recent run
        mb_recent = getMostRecentRun(base, runner_id, mb_id)
        ce_recent = getMostRecentRun(base, runner_id, ce_id)

        # if one is None, automatically assign most recent to other
        if mb_recent == None:
            most_recent_run = ce_recent
        elif ce_recent == None:
            most_recent_run = mb_recent
        # otherwise, compare for most recent
        else:
            if mb_recent > ce_recent:
                most_recent_run = mb_recent
            else:
                most_recent_run = ce_recent

        # get url to user's profile picture
        profile_picture = runner_data["assets"]["image"]["uri"]

        runner = {
            "name": runner_data["names"]["international"],
            "id": runner_id,
            "country": (country_code, country_name, sovereignty, continent),
            "name_colour": name_colour,
            "best_mb_placement": best_mb_placement,
            "best_ce_placement": best_ce_placement,
            "most_recent_run": most_recent_run,
            "twitch_handle": twitch_handle,
            "twitter_handle": twitter_handle,
            "profile_picture": profile_picture
        }

        return runner
        
    else:
        print(f"Failed to retrieve data {response.status_code}")


# gets list of set amount of runs (up to 200) from a given category
def getCategoryRunners(base_url, game_id, category_id, runners_limit, variables):
    url = f"{base_url}/leaderboards/{game_id}/category/{category_id}?top={runners_limit}&{variables}"
    response = requests.get(url)
    
    print("Fetched runners") # progress message
    
    if response.status_code == 200:
        
        runners = []
        runner_count = 0

        category_runs = response.json()
        for run in category_runs["data"]["runs"]:
            run = run["run"] # get into the dictionary of the run

            runner_id = run["players"][0]["id"]
            pb = run["times"]["primary_t"]
            pb = math.floor(pb)

            # progress message
            runner_count += 1
            print(f"Fetching runner data... [{runner_count}/{runners_limit}]")

            # get dictionary of the runner, add pb
            runner = getRunnerData(base, runner_id)
            runner.update({"pb": pb})

            # add console of the runner to dictionary
            console_id = run["system"]["platform"]
            if console_id == "3167lw9q":
                console = "Switch 2"
            elif console_id == "7m6ylw9p":
                console = "Switch 1"
            runner.update({"console": console})

            runners.append(runner)

            # progress message
            print(f"Fetched! [{runner_count}/{runners_limit}]")

        return runners

    else:
        print(f"Failed to retrieve data {response.status_code}")


# finds world record in any category incl. subcategories
def getRecordHolder(base_url, game_id, category_id, variables):
    url = f"{base_url}/leaderboards/{game_id}/category/{category_id}?top=1&{variables}"
    response = requests.get(url)

    if response.status_code == 200:
        
        record = response.json()

        wr_holders_ids = []
        wr_holders_dict = record["data"]["runs"][0]["run"]["players"] # searches through dictionary provided to find wr holder(s)

        # handles multiple wr holders if needed
        for runner in wr_holders_dict:
            wr_holders_ids.append(runner["id"])
        
        return wr_holders_ids

    else:
        print(f"Failed to retrieve data {response.status_code}")


# finds the subcategories of a given category
def getSubcategories(base_url, category_id):
    url = f"{base_url}/categories/{category_id}/variables"
    response = requests.get(url)

    if response.status_code == 200:
        variables = response.json() # finds all variables, including non-subcategories
        
        subcategories = []
        for variable in variables["data"]:
            if variable["is-subcategory"]: # if an actual subcategory, not just a variable (e.g. copy is not a subcategory)
                subcategories.append(variable)
   
        subcategories_dicts = []
        for subcategory in subcategories:

            # formats the ids of each subcategory
            subcategory_raw_ids = subcategory["values"]["choices"] # unformatted ids
            subcategory_ids = []
            for id in subcategory_raw_ids:
                subcategory_ids.append((subcategory_raw_ids[id], id)) # formatted ids

            # organises values into a dictionary
            subcategory_dict = {
            "name": subcategory["name"], # name of variable itself
            "master_id": subcategory["id"], # id for the type of variable itself
            "values": subcategory_ids # ids and names for options for variable
            }
            
            subcategories_dicts.append(subcategory_dict)
        
        return subcategories_dicts

    else:
        print(f"Failed to retrieve data {response.status_code}")


# gets a list of categories for leaderboard
def getCategories(base_url, game_id):
    url = f"{base_url}/games/{game_id}/categories"
    response = requests.get(url)
    
    if response.status_code == 200:
        categories = response.json()
        
        categories_dicts = [] # collection of categories

        for category in categories["data"]:

            # create template dictionary for storing category data neatly
            category_dict = {
                "name": category["name"],
                "id": category["id"],
                "has2P": False,
                "var_1P": None,
                "var_2P": None,
                "hasOtherSubcategory": False,
                "subcategories": []
            }

            subcategories = getSubcategories(base, category_dict["id"])

            if subcategories:
                for subcategory in subcategories:

                    # finds ids for 1p/2p subcategories and saves them separately
                    if subcategory["name"] == "Player":
                        category_dict["has2P"] = True

                        for value in subcategory["values"]:
                            if value[0] == "1P":
                                category_dict["var_1P"] = value[1]
                            if value[0] == "2P":
                                category_dict["var_2P"] = value[1]

                    else: # if the category has subcategories other than 1p/2p
                        category_dict["hasOtherSubcategory"] = True
                        category_dict["subcategories"].append(subcategory)
                
            categories_dicts.append(category_dict)

        return categories_dicts


    else:
        print(f"Failed to retrieve data {response.status_code}")


def writeToJSON(runners_limit):
    runners = getCategoryRunners(base, mb_id, any_id, runners_limit, any_1p_var)
    # outputs data to json file idk how it works lol
    with open("runnerData.json", "w") as final:
        json.dump(runners, final, indent=2, default=lambda x: list(x) if isinstance(x, tuple) else str(x))


writeToJSON(100)
