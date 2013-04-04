<?php 
$content_type = "application/json";
//$api_key = "c6b735ba497e64428c6c61b488759583298c2cf3";

$api_key = "b5e3b32b4d29d45c16dc09274e099f731237e35f";

$url = "http://api.crowdflower.com/v1/jobs.json?key=".$api_key;
$uploadDirectory = "Files/";
$file = $_FILES['uploadedfile']['name'];
$file_name = $_FILES['uploadedfile']['tmp_name'];

/* useful functions for printing the results from the web server */
function objectToArray($obj) {
	if (is_object($obj)) {
		$obj = get_object_vars($obj);
	}
	if (is_array($obj)) {
		return array_map(__FUNCTION__, $obj);
	}
	else {
		return $obj;
	}
}

function arrayToObject($d) {
	if (is_array($d)) {
		return (object) array_map(__FUNCTION__, $d);
	}
	else {
		return $d;
	}
}

/* wrap the attributes with the prefix "job" */
function prefixDataKeys($data, $prefix) {
      $newdata = array();

      foreach ($data as $key => $value) {
          $newkey = "$prefix" . '[' . $key . ']';
          $newdata[$newkey] = $value;
      }

      return $newdata;
}


/* create the settings' array */
$data = array();
$data["title"] = $_POST["title"]; //"Choose the valid RELATION(s) between the TERMS in the SENTENCE";
$data["judgments_per_unit"] = $_POST["judgments_per_unit"];
$data["max_judgments_per_worker"] = $_POST["max_judgments_per_worker"];
$data["units_per_assignment"] = $_POST["units_per_assignment"];
$data["max_judgments_per_ip"] = $_POST["max_judgments_per_ip"];
$data["webhook_uri"] = "http://www.few.vu.nl/~oil200/webhook.php";
$data["send_judgments_webhook"] = "true";
$data["payment_cents"] = $_POST["payment"];
$data["execution_mode"] = "builder";
$data["worker_ui_remix"] = "0";
$calibrated_unit_time = $_POST["seconds_per_unit"];

if ($_POST["template"] == "t1" || $_POST["template"] == "t3") {
	$myFile = "instructionsWithExtra";
	$fh = fopen($myFile, 'r');
	$theData = fread($fh, filesize($myFile));
	fclose($fh);
	$data["instructions"] = htmlspecialchars_decode(htmlspecialchars($theData)); 
}
else {
	$myFile = "instructionsWithoutExtra";
	$fh = fopen($myFile, 'r');
	$theData = fread($fh, filesize($myFile));
	fclose($fh);
	$data["instructions"] = htmlspecialchars_decode(htmlspecialchars($theData)); 
}

/* create the job with the specified settings */
$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(prefixDataKeys($data, "job")));
curl_setopt($ch, CURLOPT_URL, $url);

$response = json_decode(curl_exec($ch));
$info = curl_getinfo($ch);
$array = objectToArray($response);
//print_r(objectToArray($array));
//print_r($info);

/* job id */
$job_id = $array["id"];

/* upload the data to be annotated into the new job */ 
$upload_query = "curl -T \"$file_name\" -H \"Content-Type:text/csv\" \"https://api.crowdflower.com/v1/jobs/$job_id/upload.json?key=$api_key\"";
$response = exec($upload_query);
print_r(json_decode($response));

/* print the responses from the CrowdFlower server */
//print_r(objectToArray($response));
//print_r($array);

if ($_POST["template"] == "t1") {
	$update_cml_job = "curl -H \"application/json\" -X PUT -D - -d \"key=$api_key&job[cml]=`php cmlWithDefAndExtra.php`\" \"http://api.crowdflower.com/v1/jobs/$job_id.json\"";
$response = exec($update_cml_job);
}
else if ($_POST["template"] == "t2") {
	$update_cml_job = "curl -H \"application/json\" -X PUT -D - -d \"key=$api_key&job[cml]=`php cmlWithDefAndWithoutExtra.php`\" \"http://api.crowdflower.com/v1/jobs/$job_id.json\"";
$response = exec($update_cml_job);
}
else if ($_POST["template"] == "t3") {
	$update_cml_job = "curl -H \"application/json\" -X PUT -D - -d \"key=$api_key&job[cml]=`php cmlWithoutDefAndWithExtra.php`\" \"http://api.crowdflower.com/v1/jobs/$job_id.json\"";
$response = exec($update_cml_job);
}
else if ($_POST["template"] == "t4") {
	$update_cml_job = "curl -H \"application/json\" -X PUT -D - -d \"key=$api_key&job[cml]=`php cmlWithoutDefAndWithoutExtra.php`\" \"http://api.crowdflower.com/v1/jobs/$job_id.json\"";
$response = exec($update_cml_job);
}

//print_r(objectToArray($response));
//print_r(json_decode($response));

$update_job = "curl -X PUT -d \"job[worker_ui_remix]=false&job[execution_mode]=builder\" \"https://api.crowdflower.com/v1/jobs/".$job_id.".json?key=".$api_key."\"";
$response = exec($update_job);
//print_r(objectToArray($response));
//print_r(json_decode($response));

/* create cURL query for including countries */
$included_countries_query = "curl -X PUT -d \"job[included_countries][]=AU&job[included_countries][]=CA&job[included_countries][]=GB&job[included_countries][]=US\" \"https://api.crowdflower.com/v1/jobs/".$job_id.".json?key=".$api_key."\"";
exec($included_countries_query);

/* create cURL query for excluding countries */
$excluded_countries_query = "curl -X PUT -d \"job[excluded_countries][]=IN&job[excluded_countries][]=CN&job[excluded_countries][]=ID\" \"https://api.crowdflower.com/v1/jobs/".$job_id.".json?key=".$api_key."\"";
exec($excluded_countries_query);

/* create cURL query for adding options */
$options_query = "curl -X PUT -d \"job[options][calibrated_unit_time]=$calibrated_unit_time&job[options][mail_to]=oana.inel@gmail.com&job[options][keywords]=relations-annotation natural-language-processing text-annotation medical-relations&job[options][include_unfinished]=true&job[options][tags]=natural-language-processing<br>\" \"https://api.crowdflower.com/v1/jobs/".$job_id.".json?key=".$api_key."\"";
exec($options_query);

/* add channels to the job */
$set_channels_query = "curl -d \"channels[]=mob\" \"https://api.crowdflower.com/v1/jobs/$job_id/channels?key=$api_key\"";
exec($set_channels_query);

/*order the job */
$order_query = "curl -X POST -d \"debit[units_count]=7&channels[]=mob\" \"https://api.crowdflower.com/v1/jobs/$job_id/orders.json?key=$api_key\"";
//$response = exec($order_query);
//print_r(json_decode($response));
//$array = objectToArray($response);
//print_r($array);

/* create link for testing the job - crowdflower internal interface */
//$link = "http://crowdflower.com/judgments/mob/$job_id";
//echo "<a href=$link> Test Job </a>";

$count = count(file("/tmp/history_table.csv"));
if ($count == 0) {
//	echo "aici";
	$fp_history = fopen("/tmp/history_table.csv", 'w') or die("adssc");
	$table_header = array('job_id', 'file_name', 'no_sentences', 'no_judgments', 'max_judgments_per_worker',  'max_judgments_per_ip',  				'sentence_per_assignment', 'payment_per_assignment', 'total_payment_per_sentence', 'total_payment_job');
	fputcsv($fp_history, $table_header);
}
else {
	$fp_history = fopen("/tmp/history_table.csv", 'a');
	$row_history = array($count, $file, count(file($file_name)) - 1, $data["judgments_per_unit"], $data["max_judgments_per_worker"], $data["max_judgments_per_ip"], $data["units_per_assignment"], $_POST["payment"], $_POST["payment_per_sentence"], $_POST["payment_per_job"]);
	fputcsv($fp_history, $row_history);

}

header("Location: index.php");
//curl -X POST -d "debit[units_count]=20&channels[]=mob" "https://api.crowdflower.com/v1/jobs/170725/orders.json?key=c6b735ba497e64428c6c61b488759583298c2cf3"
?>
