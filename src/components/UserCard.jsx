const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="card bg-slate-800 w-96 shadow-sm mx-auto my-10">
      <figure>
        <img src={user.photoUrl} alt={`${user.firstName} DP`} />
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {user.firstName} {user.lastName}
        </h2>

        <p className="text-sm opacity-80">
          {user.age} years • {user.gender}
        </p>

        <p>{user.about}</p>

        <div className="card-actions justify-center p-2">
          <button className="btn btn-secondary bg-blue-500 p-2">Ignore</button>
          <button className="btn btn-primary bg-pink-600 p-2">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
