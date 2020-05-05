#!/usr/bin/env python
"""
Command-line utility for administrative tasks.
"""

import os
import sys

if __name__ == "__main__":
    os.environ.setdefault(
        "DJANGO_SETTINGS_MODULE",
        "fpo_api.settings"
    )

    from django.core.management import execute_from_command_line
    print(sys)
    print(sys.argv)
    execute_from_command_line(sys.argv)
