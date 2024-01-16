<?php 
use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Hash;
use App\Models\user;
public function store (Request $request){
        $validator = Validator::make($request->all(),[
            'email' => 'required|unique:users|email',
            'age' => 'required|numeric',
            'password' => 'required|min:7|confirmed'
        ]);
        if ($validator->fails()) {
            return $validator->errors();
        }
 
        $validated = $validator->validated();
	  $data = [(
			'name' => $request->name,
			'email' => $request->email,
			'password'=> Hash:make($request->password)

	
	   )];
	  user:create($data);
	  return Redirect("login")->withSuccess("You have register");

    }


?>
