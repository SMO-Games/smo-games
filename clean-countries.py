import pandas as pd

df = pd.read_csv("countries.csv")

sovereignty = []
for country in df["Two_Letter_Country_Code"]:
    
    if country == "CX" or country == "CC" or country == "HM" or country == "NF":
        sovereignty.append("AU")

    elif country == "GG" or country == "IM" or country == "JE" or country == "AI" or country == "BM" or country == "IO" or country == "KY" or country == "FK" or country == "GI" or country == "MS" or country == "PN" or country == "SH" or country == "GS" or country == "TC" or country == "VG":
        sovereignty.append("GB")

    elif country == "HK" or country == "MO":
        sovereignty.append("CN")

    elif country == "FO" or country == "GL":
        sovereignty.append("DK")

    elif country == "AX":
        sovereignty.append("FI")
    
    elif country == "GF" or country == "PF" or country == "TF" or country == "GP" or country == "MQ" or country == "YT" or country == "NC" or country == "RE" or country == "BL" or country == "MF" or country == "PM" or country == "WF":
        sovereignty.append("FR")

    elif country == "AW" or country == "BQ" or country == "CW" or country == "SX":
        sovereignty.append("NL")

    elif country == "CK" or country == "NU" or country == "TK":
        sovereignty.append("NZ")

    elif country == "BV" or country == "SJ":
        sovereignty.append("NO")

    elif country == "AS" or country == "GU" or country == "MP" or country == "PR" or country == "UM" or country == "VI":
        sovereignty.append("US")

    else:
        sovereignty.append(country)

df["Sovereignty"] = sovereignty
df.to_csv('countries.csv')