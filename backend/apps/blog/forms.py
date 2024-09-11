from django import forms


class CommentForm(forms.Form):
    email = forms.CharField(max_length=100, required=False)
    author = forms.CharField(max_length=100)
    body = forms.CharField(widget=forms.Textarea)
