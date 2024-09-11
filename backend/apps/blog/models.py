from django.db import models
from django_ckeditor_5.fields import CKEditor5Field
from django.urls import reverse


class Category(models.Model):
    name = models.CharField(max_length=200)
    id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.name


class Post(models.Model):
    title = models.CharField(max_length=255)
    body = CKEditor5Field(blank=False, null=True, config_name='extends')
    created_on = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    categories = models.ManyToManyField('Category', related_name='posts')
    Background = models.ImageField(upload_to="blog_images/", blank=False, null=True)
    id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('blog_detail', args=[str(self.id)])


class Comment(models.Model):
    author = models.CharField(max_length=15)
    body = models.CharField(max_length=150)
    created_on = models.DateTimeField(auto_now_add=True)
    post = models.ForeignKey('Post', on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.author
