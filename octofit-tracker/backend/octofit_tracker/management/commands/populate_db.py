from django.core.management.base import BaseCommand
from octofit_tracker import models

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete existing data
        models.User.objects.all().delete()
        models.Team.objects.all().delete()
        models.Activity.objects.all().delete()
        models.Leaderboard.objects.all().delete()
        models.Workout.objects.all().delete()

        # Create teams
        marvel = models.Team.objects.create(name='Marvel')
        dc = models.Team.objects.create(name='DC')

        # Create users
        ironman = models.User.objects.create(email='ironman@marvel.com', name='Iron Man', team=marvel)
        captain = models.User.objects.create(email='captain@marvel.com', name='Captain America', team=marvel)
        batman = models.User.objects.create(email='batman@dc.com', name='Batman', team=dc)
        superman = models.User.objects.create(email='superman@dc.com', name='Superman', team=dc)

        # Create activities
        models.Activity.objects.create(user=ironman, type='run', duration=30)
        models.Activity.objects.create(user=batman, type='cycle', duration=45)

        # Create workouts
        models.Workout.objects.create(user=ironman, description='Chest day', duration=60)
        models.Workout.objects.create(user=superman, description='Leg day', duration=50)

        # Create leaderboard
        models.Leaderboard.objects.create(user=ironman, score=100)
        models.Leaderboard.objects.create(user=superman, score=90)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
