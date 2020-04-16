<div class="sidebar">
  <h2 class="govuk-visually-hidden govuk-heading-m">Related content and links</h2>
  <?php dynamic_sidebar('sidebar') ?>
  <?php if (!is_home()) {
    dynamic_sidebar('page-sidebar');
} else {
    dynamic_sidebar('home-sidebar');
} ?>
</div>
