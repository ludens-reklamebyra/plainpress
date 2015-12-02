<?php
function theme_name_scripts() {
	wp_enqueue_style("style-name",
        get_template_directory_uri()."/assets/css/app.css");
}

add_action("wp_enqueue_scripts", "theme_name_scripts");
