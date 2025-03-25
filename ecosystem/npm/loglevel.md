# Default npm loglevel

In **npm v10 and later**, the default log level is **`"notice"`**.  

### Key Points:
1. **Default Log Level (`loglevel`)**  
   - `"notice"` is the default logging level in npm v10+.  
   - This means npm shows **important but non-critical messages** (e.g., warnings, deprecations, and general info).  

2. **Available Log Levels** (from least to most verbose):  
   - `"silent"` (no output)  
   - `"error"` (only errors)  
   - `"warn"` (errors + warnings)  
   - `"notice"` (default, includes errors, warnings, and important notices)  
   - `"http"` (network-related logs)  
   - `"timing"` (performance-related logs)  
   - `"info"` (general debugging info)  
   - `"verbose"` (detailed logs)  
   - `"silly"` (maximum verbosity, including internal npm operations)  

3. **How to Check/Change Log Level**  
   - **Check current log level:**  
     ```bash
     npm config get loglevel
     ```
   - **Set a different log level (e.g., `warn`):**  
     ```bash
     npm config set loglevel warn
     ```
   - **Override temporarily for a single command:**  
     ```bash
     npm install --loglevel silent
     ```

4. **Official Documentation**  
   - npm’s default `loglevel` is documented in the [npm config docs](https://docs.npmjs.com/cli/v10/using-npm/config#loglevel).  

### Why `"notice"`?  
- It balances usefulness (showing actionable warnings) without being too noisy (unlike `"info"` or `"verbose"`).  
- Critical errors (`"error"`) and warnings (`"warn"`) are always included.  
