var myInfo = {
  name: "Simran Panthi",
  address: "Budhanilkantha, Kathmandu",
  email: "simranpanthi101@gmail",
  interests: ["Reading Books", "Playing Games", "Programming"],
  education: [
    {
      Name: "Kanjirowa National School",
      Date: "2004",
    },
    {
      Name: "Prasadi Academy",
      Date: "2014",
    },
    {
      Name: "St. Xavier's College",
      Date: "2016",
    },
  ],
};
for (var i = 0; i < myInfo.education.length; i++) {
  var info = "";

  Object.keys(myInfo.education[i]).forEach((key) => {
    info = info + key + ":" + myInfo.education[i][key] + ", ";
  });
  new_info = info.slice(0, -2);
  console.log(new_info);
}
