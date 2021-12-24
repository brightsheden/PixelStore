from django.apps import AppConfig


class PixelstoreConfig(AppConfig):
    name = 'pixelstore'

    def ready(self) :
        import pixelstore.signal

    
