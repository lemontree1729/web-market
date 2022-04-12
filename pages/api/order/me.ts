import { Ok } from "../../../utils/server/commonError";
import { customHandler } from "../../../utils/server/commonHandler";

const handler = customHandler()
    .get(
        async (req, res) => {
            Ok(res, "success")
        }
    )


export default handler;