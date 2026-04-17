cd output
for i in wunian-*.gif;
  do name=`echo $i | cut -d'.' -f1`;
  echo $name;
  ffmpeg -y -i "$i" -r 10 "$i";
done
