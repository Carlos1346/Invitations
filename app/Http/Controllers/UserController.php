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



    public function show($id)
    {
        $user = DB::table('users')->find($id);
        if ($user) {
            return response()->json($user);
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }
    }


    public function showAuthenticatedUser()
    {
        $id = auth()->id();
        $user = DB::table('users')->find($id);
        if ($user) {
            return response()->json($user);
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }
    }


    public function update(Request $request)
    {
        // Obtener el ID del usuario autenticado
        $id = auth()->id();

        // Buscar al usuario por su ID
        $user = DB::table('users')->find($id);

        if ($user) {
            // Validar los datos enviados en la solicitud
            $request->validate([
                'name' => 'string',
                'email' => 'email|unique:users,email,' . $id,
                'password' => 'nullable|string|min:6',
            ]);

            // Crear un array con los datos a actualizar
            $data = [
                'name' => $request->name,
                'email' => $request->email,
            ];

            // Verificar si se envió una nueva contraseña y hashearla
            if ($request->filled('password')) {
                $data['password'] = bcrypt($request->password);
            }

            // Actualizar los datos del usuario en la base de datos
            DB::table('users')->where('id', $id)->update($data);

            // Retornar una respuesta exitosa
            return response()->json(['message' => 'Usuario actualizado correctamente']);
        } else {
            // Retornar un error si el usuario no se encuentra
            return response()->json(['error' => 'User not found'], 404);
        }
    }


    public function destroy()
    {
        $id = auth()->id();
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
            ->where('name', 'like', '%' . $termino . '%')
            ->get();

        if ($usuarios->isEmpty()) {
            return response()->json(['mensaje' => 'No se encontraron usuarios que coincidan con el término de búsqueda proporcionado'], 404);
        }

        return response()->json($usuarios);
    }
}


