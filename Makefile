# Cargo Tracking - Root Makefile
# Delegates all commands to code/Makefile

.PHONY: all

# Delegate everything to code/Makefile
%:
	@$(MAKE) -C code $@

# Default when no target specified
all:
	@$(MAKE) -C code help
