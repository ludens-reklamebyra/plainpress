<?php get_header(); ?>
<?php if(have_posts()) : ?>
    <div class="row">
        <?php while(have_posts()) : the_post(); ?>
            <div class="column">

            </div>
        <?php endwhile; ?>
    </div>
<?php endif; ?>
<?php get_footer(); ?>
