<?php get_header(); ?>
<?php if(have_posts()) : ?>
    <div class="app">
        <div class="row">
            <?php while(have_posts()) : the_post(); ?>
                <div class="column">
                    <h1 class="app-title">Welcome to Plainpress</h1>
                </div>
            <?php endwhile; ?>
        </div>
    </div>
    <div class="app-body">
        <img
            src="<?php bloginfo('template_url'); ?>/assets/images/plainpress-logo.png"
            alt="logo"
        />
    </div>
<?php endif; ?>
<?php get_footer(); ?>
