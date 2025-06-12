![moon-base logo](https://github.com/1WIR3/Moon-Base/blob/main/moon-base-repo-rm.png) 
```Moon Base is a visual editor designed to help you create, customize, and manage your [Starship](https://starship.rs/) prompt configuration files (`starship.toml`) with ease. It provides a user-friendly interface to tweak various settings, modules, and palettes, offering a live preview of both your prompt and the generated TOML output.```

## ✨ Features

*   **Visual Configuration**: Interactively edit Starship settings without directly writing TOML.
*   **Predefined Templates**: Start quickly with a selection of common Starship prompt templates.
*   **Live Prompt Preview**: See an estimated visual representation of your prompt as you make changes.
*   **Real-time TOML Output**: View the generated `starship.toml` content, updated instantly.
*   **Global Settings Editor**: Configure top-level settings like `format`, `right_format`, `add_newline`, etc.
*   **Module Customization**:
    *   Enable or disable individual modules.
    *   Modify module `format` and `style` strings.
    *   Adjust module-specific properties (e.g., `truncation_length` for `directory`, symbols for `git_status`).
    *   Easy access to official module documentation.
*   **Palette Management**:
    *   Choose from predefined color palettes (e.g., Nord, Solarized Dark, Gruvbox).
    *   Create and manage custom palette variables for consistent styling.
    *   Color pickers for easy color selection.
*   **Import/Export**:
    *   Import an existing `starship.toml` file to edit visually.
    *   Export your configuration as a `starship.toml` file.
*   **Responsive Design**: Usable across different screen sizes.
*   **In-App Help**: A comprehensive help section guides you through Starship concepts and editor usage.
*   **Direct Links**: Quick links to Starship's official documentation and GitHub repository.

## 🚀 How to Use

Moon Base is designed to be intuitive. Here's a general workflow:

1.  **Access the Application**: Open `index.html` in your web browser.

2.  **Select a Template (Optional)**:
    *   On the left panel, under "Templates," you can choose a predefined template from the dropdown menu.
    *   Details of the selected template will appear below the dropdown.
    *   This is a great starting point if you're new or want a base to customize.

3.  **Customize Global Settings**:
    *   In the central panel, expand the "Global Settings" section.
    *   Modify settings like "Global Prompt Format" (`format`), "Right Prompt Format" (`right_format`), "Add Newline," etc.
    *   These settings define the overall structure and behavior of your prompt.

4.  **Configure Modules**:
    *   Scroll down to the "Modules" section in the central panel.
    *   Each available Starship module is listed (e.g., `directory`, `git_branch`, `nodejs`).
    *   **Enable/Disable**: Use the toggle switch next to each module name to enable or disable it.
    *   **Expand Module**: Click on a module's header to expand its settings.
    *   **Format & Style**: Adjust the `format` string (how the module's information is displayed) and the `style` string (its colors and text attributes).
    *   **Module-Specific Properties**: Configure individual properties for the module (e.g., `truncation_length` for the directory module, symbols for git status indicators). Tooltips and descriptions are provided.
    *   **Documentation**: Click the link icon next to the module name to visit the official Starship documentation for that module.

5.  **Manage Palettes**:
    *   In the "Palettes" section (above Modules), you can define color variables.
    *   **Predefined Palettes**: Select a predefined palette like "Nord" or "Solarized Dark" from the dropdown. This will populate the variables.
    *   **Custom Variables**:
        *   Add new variables by entering a name (e.g., `my_custom_blue`) and a value (e.g., `#5e81ac bold` or `blue underline`).
        *   Use the color picker to easily select colors, which will then be combined with other style attributes (like `bold`).
        *   These variables can then be used in your module `style` strings (e.g., `style = "$my_custom_blue"`).

6.  **Observe Previews**:
    *   **Live Preview Panel** (bottom left): Shows an approximation of how your prompt will look. This preview uses dummy data for module variables.
    *   **TOML Preview Panel** (bottom right): Displays the `starship.toml` content that is generated based on your current configuration. This is what you'll save and use with Starship.

7.  **Import Existing Configuration**:
    *   Click the "Import" icon (upward arrow) in the header.
    *   Select your local `starship.toml` file. The editor will load its configuration.
    *   The template selector will indicate "Imported Configuration".

8.  **Export Your Configuration**:
    *   Once you're happy with your setup, click the "Export" icon (downward arrow) in the header.
    *   This will download a `starship.toml` file containing your current configuration.
    *   Save this file to `~/.config/starship.toml` (or the appropriate location for your OS) for Starship to use it.

9.  **Get Help**:
    *   Click the "Help" icon (question mark) in the header to open a modal with guidance on Starship concepts, formatting, styling, and Nerd Fonts.

## 💡 Tips for Starship

*   **Nerd Fonts**: For many icons and symbols to display correctly in your terminal (and in the Live Preview), you'll need a [Nerd Font](https://www.nerdfonts.com/) installed and configured in your terminal emulator.
*   **Format Strings**:
    *   Variables like `$directory`, `$git_branch` are replaced by module output.
    *   Use `[]` to make a section optional (it only appears if the variables inside it have content). E.g., `[on $hostname]`.
*   **Style Strings**:
    *   Combine colors (e.g., `green`, `fg:#ff0000`, `bg:blue`) and attributes (e.g., `bold`, `italic`, `underline`, `dimmed`).
    *   Refer to the [Starship documentation on styling](https://starship.rs/config/#styling) for all options.
*   **Palettes**: Using the `[palette]` table (managed via the Palette Editor) is highly recommended for defining reusable color variables, making your configuration cleaner and easier to maintain.

## 🤝 Contributing & Feedback

This project is an evolving tool. If you have suggestions, find bugs, or want to contribute, please check the project's repository (if available) for contribution guidelines or to open an issue.

## 📄 License

(Specify your license here, e.g., MIT License)

---


# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
