
import re

with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

stack = []
for i, line in enumerate(lines):
    ln = i + 1
    # Find all tags in line
    tags = re.findall(r'<(div|section|main|body|html|header|footer|nav)(?:\s+[^>]*)?>|</(div|section|main|body|html|header|footer|nav)>', line)
    for open_tag, close_tag in tags:
        if open_tag:
            stack.append((open_tag, ln))
        else:
            if not stack:
                print(f"Error: Unexpected closing tag </{close_tag}> at line {ln}")
            else:
                top_tag, top_ln = stack.pop()
                if top_tag != close_tag:
                    print(f"Error: Mismatched tag. Expected </{top_tag}> (opened at line {top_ln}), but found </{close_tag}> at line {ln}")

while stack:
    tag, ln = stack.pop()
    print(f"Error: Unclosed tag <{tag}> opened at line {ln}")
