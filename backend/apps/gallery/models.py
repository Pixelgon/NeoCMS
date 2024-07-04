from django.db import models
from PIL import Image as PILImage

class Image(models.Model):
    title = models.CharField(max_length=100)
    photo = models.ImageField(upload_to="gallery_images/full/", required=True)
    photo_preview = models.ImageField(upload_to="gallery_images/preview/")
    id = models.AutoField(primary_key=True)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        img = PILImage.open(self.photo.path)
        img.thumbnail((500, 500))
        img.save(self.photo_preview.path)
