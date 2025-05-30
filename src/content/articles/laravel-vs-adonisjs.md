---
title: "Laravel vs. AdonisJs: Which should you use?"
date: "Nov 20, 2020"
readTime: "5 min read"
description: "Compare Laravel and AdonisJs with this tutorial highlighting the best and worst features of each framework."
slug: "laravel-vs-adonisjs"
category: "Backend"
---

Laravel and AdonisJs are both powerful MVC frameworks, but they serve different needs. Let's compare their features and help you choose the right one for your project.

## Basic Setup

### Laravel Setup
```php
// routes/web.php
Route::get('/', function () {
    return view('welcome');
});

// app/Http/Controllers/UserController.php
namespace App\Http\Controllers;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return view('users.index', compact('users'));
    }
}
```

### AdonisJs Setup
```typescript
// start/routes.ts
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return view.render('welcome')
})

// app/Controllers/Http/UsersController.ts
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async index({ view }: HttpContextContract) {
    const users = await User.all()
    return view.render('users/index', { users })
  }
}
```

## Database Operations

### Laravel Eloquent
```php
// app/Models/User.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = ['name', 'email'];
    
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}

// Usage
$users = User::where('active', true)
    ->with('posts')
    ->get();
```

### AdonisJs Lucid
```typescript
// app/Models/User.ts
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Post from 'App/Models/Post'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>
}

// Usage
const users = await User
  .query()
  .where('active', true)
  .preload('posts')
```

## Authentication

### Laravel Authentication
```php
// config/auth.php
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],
    'api' => [
        'driver' => 'sanctum',
        'provider' => 'users',
    ],
],

// Routes
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    });
});
```

### AdonisJs Authentication
```typescript
// config/auth.ts
import { AuthConfig } from '@ioc:Adonis/Addons/Auth'

const authConfig: AuthConfig = {
  guard: 'web',
  guards: {
    web: {
      driver: 'session',
      provider: {
        driver: 'lucid',
        model: () => import('App/Models/User')
      }
    },
    api: {
      driver: 'oat',
      provider: {
        driver: 'lucid',
        model: () => import('App/Models/User')
      }
    }
  }
}

// Routes
Route.group(() => {
  Route.get('dashboard', 'DashboardController.index')
}).middleware('auth')
```

## Middleware

### Laravel Middleware
```php
// app/Http/Middleware/CheckRole.php
namespace App\Http\Middleware;

use Closure;

class CheckRole
{
    public function handle($request, Closure $next, $role)
    {
        if (!$request->user()->hasRole($role)) {
            return redirect('home');
        }
        return $next($request);
    }
}

// Usage
Route::get('/admin', function () {
    // ...
})->middleware('role:admin');
```

### AdonisJs Middleware
```typescript
// app/Middleware/CheckRole.ts
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CheckRole {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>,
    roles: string[]
  ) {
    if (!auth.user?.hasRole(roles)) {
      return response.redirect().back()
    }
    await next()
  }
}

// Usage
Route.get('admin', 'AdminController.index').middleware('checkRole:admin')
```

## Form Validation

### Laravel Validation
```php
// app/Http/Requests/StoreUserRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
        ];
    }
}

// Controller
public function store(StoreUserRequest $request)
{
    $validated = $request->validated();
    User::create($validated);
}
```

### AdonisJs Validation
```typescript
// app/Validators/CreateUser.ts
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' })
    ]),
    password: schema.string({}, [
      rules.minLength(8),
      rules.confirmed()
    ])
  })
}

// Controller
public async store({ request }: HttpContextContract) {
  const payload = await request.validate(CreateUserValidator)
  await User.create(payload)
}
```

## Queue Processing

### Laravel Queue
```php
// app/Jobs/ProcessPodcast.php
namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;

class ProcessPodcast implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function handle()
    {
        // Process the job
    }
}

// Dispatch job
ProcessPodcast::dispatch();
```

### AdonisJs Queue
```typescript
// app/Jobs/ProcessPodcast.ts
import { JobContract } from '@ioc:Adeonis/Core/Queue'

export default class ProcessPodcast implements JobContract {
  public key = 'ProcessPodcast'

  public async handle() {
    // Process the job
  }
}

// Dispatch job
import Queue from '@ioc:Adonis/Core/Queue'
await Queue.dispatch(new ProcessPodcast())
```

## Performance Comparison

### Laravel
```php
// Cache implementation
Cache::remember('users', 3600, function () {
    return DB::table('users')->get();
});

// Route caching
php artisan route:cache
```

### AdonisJs
```typescript
// Cache implementation
import Cache from '@ioc:Adonis/Addons/Cache'

await Cache.remember('users', 3600, async () => {
  return Database.from('users').select('*')
})

// Route caching is automatic in production
```

## Framework-Specific Features

### Laravel's Unique Features
```php
// Blade Templates
@extends('layouts.app')

@section('content')
    @foreach($users as $user)
        {{ $user->name }}
    @endforeach
@endsection

// Artisan Commands
php artisan make:model User -mcr
```

### AdonisJs's Unique Features
```typescript
// Edge Templates
@layout('layouts/app')

@section('content')
  @each(user in users)
    {{ user.name }}
  @end
@end

// Ace Commands
node ace make:model User -m
```

## Conclusion

Laravel Strengths:
- Mature ecosystem
- Extensive documentation
- Large community
- Rich package ecosystem
- PHP's ubiquity

AdonisJs Strengths:
- TypeScript first
- Better performance
- Modern architecture
- Built-in features
- Node.js ecosystem

Choose Laravel if:
- You need extensive community support
- Working with PHP hosting
- Need many ready-made packages
- Traditional web applications

Choose AdonisJs if:
- You prefer TypeScript
- Building APIs
- Need better performance
- Modern JavaScript ecosystem
- Microservices architecture

For more information:
- [Laravel Documentation](https://laravel.com/docs)
- [AdonisJs Documentation](https://adonisjs.com/) 