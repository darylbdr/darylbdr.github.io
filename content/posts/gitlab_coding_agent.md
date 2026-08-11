---
title: 'Local GitLab AI Coding Agent'
draft: false
showToc: true
categories: ["project"]
weight: 2
---

I implemented an autonomous AI coding agent designed to resolve GitLab issues using local LLMs via [Ollama](https://ollama.com/) and the [python-gitlab](https://python-gitlab.readthedocs.io/en/stable/) API. 

By leveraging native **Function Calling**, the agent independently explores repository structures, reads files, implements fixes on dedicated branches, and submits Merge Requests—keeping your codebase 100% private and on-premise.

## Features
- Monitors GitLab issues labeled with `ai:agent`.
- Analyzes the issue title and description.
- Interacts with the repository (reads files, lists directories).
- Creates a dedicated branch for the fix.
- Generates code fixes and commits them.
- Opens a Merge Request when the fix is ready.

*The full code is available on this [github repo](https://github.com/darylbdr/Local-Gitlab-Coding-Agent).*

## 1. Architecture 
```
   +-------------------------------------------------------+
   |                     Local Machine                     |
   |                                                       |
   |  +-----------------+         +---------------------+  |
   |  |  Ollama Engine  |         | Orchestrator Loop   |  |
   |  |  (Local Model)  | <=====> | (main.py)           |  |
   |  +-----------------+         +----------+----------+  |
   |                                         |             |
   |                                         v             |
   |                              +--------------------+   |
   |                              |  Tool Dispatcher   |   |
   |                              |  (dispatcher.py)   |   |
   |                              +----------+---------+   |
   +-----------------------------------------|-------------+
                                             |
                                             | python-gitlab API
                                             v
                              +------------------------------+
                              |       GitLab Instance        |
                              |  (Issues, Files, Commits)    |
                              +------------------------------+
```

Since LLMs cannot directly interact with external APIs, the agent uses structured function schemas. This allows the model to select and trigger appropriate repository actions based on context.

## 2. Function Definition & Schema
Functions include clear docstrings that explain their intent and parameters to the model:

```python
def get_repo_info(self, path: str = '.'):
    """
    Lists all items inside the specified repository directory.

    Args:
        path (str): Directory path to inspect. Defaults to '.' (root directory).

    Returns:
        str: Directory contents including files and subdirectories.
    """
```

## 3. Dispatcher Pattern
When Ollama returns a tool call request, the dispatcher executes the matching GitLab API action:

```Python
try:
    match tool.function.name:
        case "update_ai_branch":
            result = client.update_ai_branch(**tool.function.arguments)
        case "create_commit":
            result = client.create_commit(**tool.function.arguments)
        case "create_merge_request":
            result = client.create_merge_request(**tool.function.arguments)
        case "get_repo_info":
            result = client.get_repo_info(**tool.function.arguments)
        case "read_file_content":
            result = client.read_file_content(**tool.function.arguments)
```

## 4. Agent System Prompt
The core logic in [services/config.py](https://github.com/darylbdr/Local-Gitlab-Coding-Agent/blob/main/services/config.py) guides the agent's step-by-step decision loop which looks like this:

```Python
GITLAB_PROMPT = """
You are an autonomous AI coding agent.
Your task is to resolve GitLab issues step-by-step using the issue's title, description,
and context.

Available Actions:
- Create or update the workspace branch (`ai_branch`).
- Inspect directory trees and read file contents.
- Generate and commit code changes.
- Open a Merge Request upon completion.etc... 
"""
```
