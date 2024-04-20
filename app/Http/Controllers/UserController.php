<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index()
    {
        $users = DB::table('users')->get();
        return response()->json($users);
    }

    public function create(Request $request)
    {
        $request->validate([
            'username' => 'required|string|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            // Otras reglas de validación según tus necesidades
        ]);

        DB::table('users')->insert([
            'username' => $request->username,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            // Otros campos del usuario
        ]);

        return response()->json(['message' => 'User created successfully'], 201);
    }

    public function show($id)
    {
        $user = DB::table('users')->find($id);
        if ($user) {
            return response()->json($user);
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }
    }

    public function update(Request $request)
    {
        $id=auth()->id();
        $user = DB::table('users')->find($id);

        if ($user) {
            $request->validate([
                'username' => 'string|unique:users,username,' . $id,
                'email' => 'email|unique:users,email,' . $id,
                'password' => 'string|min:8',
                // Otras reglas de validación según tus necesidades
            ]);

            $data = [
                'username' => $request->username,
                'email' => $request->email,
            ];

            if ($request->has('password')) {
                $data['password'] = bcrypt($request->password);
            }

            DB::table('users')->where('id', $id)->update($data);

            return response()->json(['message' => 'User updated successfully']);
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }
    }

    public function destroy()
    {
        $id=auth()->id();
        $user = DB::table('users')->find($id);
        if ($user) {
            DB::table('friends')->where('user_id1', $id)->orWhere('user_id2', $id)->delete();
            DB::table('users')->where('id', $id)->delete();
            return response()->json(null, 204);
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }
    }



    public function search(Request $request)
    {
        $termino = $request->input('termino');

        $usuarios = DB::table('users')
            ->where('name', 'like', '%'.$termino.'%')
            ->get();

        if ($usuarios->isEmpty()) {
            return response()->json(['mensaje' => 'No se encontraron usuarios que coincidan con el término de búsqueda proporcionado'], 404);
        }

        return response()->json($usuarios);
    }
}


