import { Link } from "react-router-dom";
const SignIn = () => {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-3 lg:grid lg:grid-cols-2">
        <div className="space-y-6">
          <Link to={{
            href:"/"
          }} href="/">
            <div className="w-fit flex items-center">
              <div className=" text-xs font-medium lg:text-sm">
                <p>Text</p>
                <p>Text Text</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
