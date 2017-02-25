insert into incidents
  (us_state, injury_id, cause_Id)
 values($1, $2, $3)
returning * 
