from django.shortcuts import render
from django.http import HttpResponse
from models import Photo

# Create your views here.

photos = Photo.objects.order_by('date')
series = Photo.objects.values_list('series', flat=True).distinct()

def landing(request):
	return render(request, 'html/landing.html', {'photos' : photos})

def about(request):
	return render(request, 'html/about.html')

def gallery(request):
    return render(request, 'html/gallery.html', {'photos' : photos, 'series' : series})

def instagram(request):
	return render(request, 'html/instagram.html')


