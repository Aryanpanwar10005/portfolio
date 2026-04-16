
import re

file_path = r"c:\Projects\aryanpanwar-portfolio\system_requirements_utf8.txt"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Search for Table of Contents or TOC
toc_matches = re.finditer(r"(Table of Contents|TOC|Quick Navigation)", content, re.IGNORECASE)
print("--- Table of Contents Search ---")
for match in toc_matches:
    start = max(0, match.start() - 200)
    end = min(len(content), match.end() + 200)
    print(f"Match found at {match.start()}:")
    print(content[start:end])
    print("-" * 20)

# Search for Cookie
cookie_matches = re.finditer(r"Cookie", content, re.IGNORECASE)
print("\n--- Cookie Search ---")
for match in cookie_matches:
    start = max(0, match.start() - 200)
    end = min(len(content), match.end() + 200)
    print(f"Match found at {match.start()}:")
    print(content[start:end])
    print("-" * 20)
