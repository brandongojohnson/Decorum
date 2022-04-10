function IDGenerator() {
  var text = "-Mz";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";

  for (var i = 0; i < 18; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export {IDGenerator}; 
