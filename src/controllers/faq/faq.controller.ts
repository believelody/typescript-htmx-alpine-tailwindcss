import { FAQ } from "@enums/faq.enum";
import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

export const faqTitle = "Frequently Asked Questions";

const faqContent: FAQ = {
	basics: [
		{
			question: "How do I change my password ?",
			answer: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. In provident culpa quas! Neque perspiciatis ullam eveniet
      alias aspernatur officiis et consequuntur ipsa dolorum veritatis cumque minima nemo at molestias ut, quia accusantium
      illum fuga illo excepturi. Veniam dicta asperiores eligendi maiores aut adipisci nobis placeat voluptatum quidem autem
      suscipit hic, iste assumenda perspiciatis, magni tempore sed dolorem nisi corrupti porro laudantium itaque nam? Quis
      cumque ab laudantium cum necessitatibus saepe, iste inventore voluptatem consequatur pariatur?`,
		},
		{
			question: "How do I sign up ?",
			answer: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita adipisci odit rem reprehenderit repellat inventore
      in voluptates, perspiciatis sequi incidunt minima quaerat excepturi eligendi veritatis tenetur omnis quae? Eius, illo
      quos necessitatibus consequatur repudiandae dicta a modi cupiditate sed fuga voluptatem ab mollitia suscipit ipsum
      fugiat libero optio porro pariatur facilis repellat incidunt, ipsa unde. Enim ex facere aspernatur, error provident
      architecto laboriosam, explicabo iste quas reiciendis consequatur eius voluptate obcaecati odit earum iusto velit
      voluptas nemo repellendus porro. Provident quaerat error, sit, a atque debitis veritatis molestiae odio, nesciunt
      praesentium architecto? Autem ipsum deleniti iusto. Vel saepe dolores assumenda?`,
		},
		{
			question: "Can I remove a post ?",
			answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore voluptate qui nemo nostrum velit, quibusdam dolor
      illum atque in, ab totam soluta repellendus fugiat cupiditate et ducimus mollitia commodi perferendis.`,
		},
		{
			question: "How do reviews work ?",
			answer: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. In provident culpa quas! Neque perspiciatis ullam eveniet
      alias aspernatur officiis et consequuntur ipsa dolorum veritatis cumque minima nemo at molestias ut, quia accusantium
      illum fuga illo excepturi. Veniam dicta asperiores eligendi maiores aut adipisci nobis placeat voluptatum quidem autem
      suscipit hic, iste assumenda perspiciatis, magni tempore sed dolorem nisi corrupti porro laudantium itaque nam? Quis
      cumque ab laudantium cum necessitatibus saepe, iste inventore voluptatem consequatur pariatur?`,
		},
	],
	mobile: [
		{
			question: "How does syncing work ?",
			answer: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos quaerat vel saepe, neque alias ad tempora
      soluta enim aliquam deserunt. Autem ducimus temporibus, cupiditate quia perspiciatis porro culpa!`,
		},
		{
			question: "How do I upload files from my phone or table ?",
			answer: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita adipisci odit rem reprehenderit repellat
      inventore in voluptates, perspiciatis sequi incidunt minima quaerat excepturi eligendi veritatis tenetur omnis quae? Eius,
      illo quos necessitatibus consequatur repudiandae dicta a modi cupiditate sed fuga voluptatem ab mollitia suscipit ipsum
      fugiat libero optio porro pariatur facilis repellat incidunt, ipsa unde. Enim ex facere aspernatur, error
      provident architecto laboriosam, explicabo iste quas reiciendis consequatur eius voluptate obcaecati odit earum iusto velit
      voluptas nemo repellendus porro. Provident quaerat error, sit, a atque debitis veritatis molestiae odio, nesciunt
      praesentium architecto? Autem ipsum deleniti iusto. Vel saepe dolores assumenda?`,
		},
		{
			question: "How to link to a file or folder ?",
			answer: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus vel accusantium odio praesentium sint quae
      molestias, maiores quidem cum reprehenderit nisi aut perferendis suscipit magni consectetur officia blanditiis
      quis velit, eius facere debitis in neque facilis quasi? Architecto rerum corporis delectus provident at
      perferendis ipsa.`,
		},
	],
	account: [
		{
			question: "How do I change my password ?",
			answer: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. In provident culpa quas! Neque perspiciatis ullam eveniet
      alias aspernatur officiis et consequuntur ipsa dolorum veritatis cumque minima nemo at molestias ut, quia accusantium
      illum fuga illo excepturi. Veniam dicta asperiores eligendi maiores aut adipisci nobis placeat voluptatum quidem autem
      suscipit hic, iste assumenda perspiciatis, magni tempore sed dolorem nisi corrupti porro laudantium itaque nam? Quis
      cumque ab laudantium cum necessitatibus saepe, iste inventore voluptatem consequatur pariatur?`,
		},
		{
			question: "How do I delete my account ?",
			answer: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita adipisci odit rem reprehenderit repellat inventore
      in voluptates, perspiciatis sequi incidunt minima quaerat excepturi eligendi veritatis tenetur omnis quae? Eius, illo
      quos necessitatibus consequatur repudiandae dicta a modi cupiditate sed fuga voluptatem ab mollitia suscipit ipsum
      fugiat libero optio porro pariatur facilis repellat incidunt, ipsa unde. Enim ex facere aspernatur, error provident
      architecto laboriosam, explicabo iste quas reiciendis consequatur eius voluptate obcaecati odit earum iusto velit
      voluptas nemo repellendus porro. Provident quaerat error, sit, a atque debitis veritatis molestiae odio, nesciunt
      praesentium architecto? Autem ipsum deleniti iusto. Vel saepe dolores assumenda?`,
		},
		{
			question: "How do i change my account settings ?",
			answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore voluptate qui nemo nostrum velit, quibusdam dolor
      illum atque in, ab totam soluta repellendus fugiat cupiditate et ducimus mollitia commodi perferendis.`,
		},
		{
			question: "I forgot my password. How do I reset it ?",
			answer: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. In provident culpa quas! Neque perspiciatis ullam eveniet
      alias aspernatur officiis et consequuntur ipsa dolorum veritatis cumque minima nemo at molestias ut, quia accusantium
      illum fuga illo excepturi. Veniam dicta asperiores eligendi maiores aut adipisci nobis placeat voluptatum quidem autem
      suscipit hic, iste assumenda perspiciatis, magni tempore sed dolorem nisi corrupti porro laudantium itaque nam? Quis
      cumque ab laudantium cum necessitatibus saepe, iste inventore voluptatem consequatur pariatur?`,
		},
	],
	payments: [
		{
			question: "Can I have an invoice for my subscription ?",
			answer: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. In provident culpa quas! Neque perspiciatis ullam eveniet
      alias aspernatur officiis et consequuntur ipsa dolorum veritatis cumque minima nemo at molestias ut, quia accusantium
      illum fuga illo excepturi. Veniam dicta asperiores eligendi maiores aut adipisci nobis placeat voluptatum quidem autem
      suscipit hic, iste assumenda perspiciatis, magni tempore sed dolorem nisi corrupti porro laudantium itaque nam? Quis
      cumque ab laudantium cum necessitatibus saepe, iste inventore voluptatem consequatur pariatur?`,
		},
		{
			question: "Why did my credit card or paypal payment fail ?",
			answer: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita adipisci odit rem reprehenderit repellat inventore
      in voluptates, perspiciatis sequi incidunt minima quaerat excepturi eligendi veritatis tenetur omnis quae? Eius, illo
      quos necessitatibus consequatur repudiandae dicta a modi cupiditate sed fuga voluptatem ab mollitia suscipit ipsum
      fugiat libero optio porro pariatur facilis repellat incidunt, ipsa unde. Enim ex facere aspernatur, error provident
      architecto laboriosam, explicabo iste quas reiciendis consequatur eius voluptate obcaecati odit earum iusto velit
      voluptas nemo repellendus porro. Provident quaerat error, sit, a atque debitis veritatis molestiae odio, nesciunt
      praesentium architecto? Autem ipsum deleniti iusto. Vel saepe dolores assumenda?`,
		},
		{
			question:
				"Why does my bank statement show multiple charges for one upgrade ?",
			answer: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. In provident culpa quas! Neque perspiciatis ullam eveniet
      alias aspernatur officiis et consequuntur ipsa dolorum veritatis cumque minima nemo at molestias ut, quia accusantium
      illum fuga illo excepturi. Veniam dicta asperiores eligendi maiores aut adipisci nobis placeat voluptatum quidem autem
      suscipit hic, iste assumenda perspiciatis, magni tempore sed dolorem nisi corrupti porro laudantium itaque nam? Quis
      cumque ab laudantium cum necessitatibus saepe, iste inventore voluptatem consequatur pariatur?`,
		},
	],
	privacy: [
		{
			question: "Can I specify my own private key ?",
			answer: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. In provident culpa quas! Neque perspiciatis ullam eveniet
      alias aspernatur officiis et consequuntur ipsa dolorum veritatis cumque minima nemo at molestias ut, quia accusantium
      illum fuga illo excepturi. Veniam dicta asperiores eligendi maiores aut adipisci nobis placeat voluptatum quidem autem
      suscipit hic, iste assumenda perspiciatis, magni tempore sed dolorem nisi corrupti porro laudantium itaque nam? Quis
      cumque ab laudantium cum necessitatibus saepe, iste inventore voluptatem consequatur pariatur?`,
		},
		{
			question: "My files are missing. How do I get them back ?",
			answer: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita adipisci odit rem reprehenderit repellat inventore
      in voluptates, perspiciatis sequi incidunt minima quaerat excepturi eligendi veritatis tenetur omnis quae? Eius, illo
      quos necessitatibus consequatur repudiandae dicta a modi cupiditate sed fuga voluptatem ab mollitia suscipit ipsum
      fugiat libero optio porro pariatur facilis repellat incidunt, ipsa unde. Enim ex facere aspernatur, error provident
      architecto laboriosam, explicabo iste quas reiciendis consequatur eius voluptate obcaecati odit earum iusto velit
      voluptas nemo repellendus porro. Provident quaerat error, sit, a atque debitis veritatis molestiae odio, nesciunt
      praesentium architecto? Autem ipsum deleniti iusto. Vel saepe dolores assumenda?`,
		},
		{
			question: "How can I access my account data ?",
			answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore voluptate qui nemo nostrum velit, quibusdam dolor
      illum atque in, ab totam soluta repellendus fugiat cupiditate et ducimus mollitia commodi perferendis.`,
		},
		{
			question:
				"How can I control if other search engines can link to my profile ?",
			answer: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. In provident culpa quas! Neque perspiciatis ullam eveniet
      alias aspernatur officiis et consequuntur ipsa dolorum veritatis cumque minima nemo at molestias ut, quia accusantium
      illum fuga illo excepturi. Veniam dicta asperiores eligendi maiores aut adipisci nobis placeat voluptatum quidem autem
      suscipit hic, iste assumenda perspiciatis, magni tempore sed dolorem nisi corrupti porro laudantium itaque nam? Quis
      cumque ab laudantium cum necessitatibus saepe, iste inventore voluptatem consequatur pariatur?`,
		},
	],
	delivery: [
		{
			question: "What should I do if my order hasn't been delivered yet ?",
			answer: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. In provident culpa quas! Neque perspiciatis ullam
      eveniet
      alias aspernatur officiis et consequuntur ipsa dolorum veritatis cumque minima nemo at molestias ut, quia
      accusantium
      illum fuga illo excepturi. Veniam dicta asperiores eligendi maiores aut adipisci nobis placeat voluptatum quidem
      autem
      suscipit hic, iste assumenda perspiciatis, magni tempore sed dolorem nisi corrupti porro laudantium itaque nam?
      Quis
      cumque ab laudantium cum necessitatibus saepe, iste inventore voluptatem consequatur pariatur?`,
		},
		{
			question: "How can I find your international delivery information ?",
			answer: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita adipisci odit rem reprehenderit repellat
      inventore in voluptates, perspiciatis sequi incidunt minima quaerat excepturi eligendi veritatis tenetur omnis quae? Eius,
      illo quos necessitatibus consequatur repudiandae dicta a modi cupiditate sed fuga voluptatem ab mollitia suscipit ipsum
      fugiat libero optio porro pariatur facilis repellat incidunt, ipsa unde. Enim ex facere aspernatur, error
      provident architecto laboriosam, explicabo iste quas reiciendis consequatur eius voluptate obcaecati odit earum iusto velit
      voluptas nemo repellendus porro. Provident quaerat error, sit, a atque debitis veritatis molestiae odio, nesciunt
      praesentium architecto? Autem ipsum deleniti iusto. Vel saepe dolores assumenda?`,
		},
		{
			question: "Who takes care of shipping ?",
			answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore voluptate qui nemo nostrum velit, quibusdam dolor
      illum atque in, ab totam soluta repellendus fugiat cupiditate et ducimus mollitia commodi perferendis.`,
		},
		{
			question: "How do returns or refunds work ?",
			answer: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. In provident culpa quas! Neque perspiciatis ullam
      eveniet alias aspernatur officiis et consequuntur ipsa dolorum veritatis cumque minima nemo at molestias ut, quia
      accusantium illum fuga illo excepturi. Veniam dicta asperiores eligendi maiores aut adipisci nobis placeat voluptatum quidem
      autem suscipit hic, iste assumenda perspiciatis, magni tempore sed dolorem nisi corrupti porro laudantium itaque nam?
      Quis cumque ab laudantium cum necessitatibus saepe, iste inventore voluptatem consequatur pariatur?`,
		},
		{
			question: "How do I use shipping profiles ?",
			answer: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, totam incidunt praesentium molestias voluptatum
      eaque delectus accusamus odit aspernatur repellendus, placeat, quisquam dolorem laborum harum. Quidem, explicabo
      nesciunt?`,
		},
		{
			question: "How does your UK Next Day delivery service work ?",
			answer: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. In provident culpa quas! Neque perspiciatis ullam
      eveniet alias aspernatur officiis et consequuntur ipsa dolorum veritatis cumque minima nemo at molestias ut, quia
      accusantium illum fuga illo excepturi. Veniam dicta asperiores eligendi maiores aut adipisci nobis placeat voluptatum quidem
      autem suscipit hic, iste assumenda perspiciatis, magni tempore sed dolorem nisi corrupti porro laudantium itaque nam?
      Quis cumque ab laudantium cum necessitatibus saepe, iste inventore voluptatem consequatur pariatur?`,
		},
		{
			question: "When will my order arrive ?",
			answer: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. In provident culpa quas! Neque perspiciatis ullam
      eveniet alias aspernatur officiis et consequuntur ipsa dolorum veritatis cumque minima nemo at molestias ut, quia
      accusantium illum fuga illo excepturi. Veniam dicta asperiores eligendi maiores aut adipisci nobis placeat voluptatum quidem
      autem suscipit hic, iste assumenda perspiciatis, magni tempore sed dolorem nisi corrupti porro laudantium itaque nam?
      Quis cumque ab laudantium cum necessitatibus saepe, iste inventore voluptatem consequatur pariatur?`,
		},
		{
			question: "When will my order ship ?",
			answer: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. In provident culpa quas! Neque perspiciatis ullam
      eveniet alias aspernatur officiis et consequuntur ipsa dolorum veritatis cumque minima nemo at molestias ut, quia
      accusantium illum fuga illo excepturi. Veniam dicta asperiores eligendi maiores aut adipisci nobis placeat voluptatum quidem
      autem suscipit hic, iste assumenda perspiciatis, magni tempore sed dolorem nisi corrupti porro laudantium itaque nam?
      Quis cumque ab laudantium cum necessitatibus saepe, iste inventore voluptatem consequatur pariatur?`,
		},
	],
};

router.get("/", (req: Request, res: Response, next: NextFunction) => {
	try {
		const menu = Object.keys(faqContent);
		const contents = menu.map((item) => ({
			name: item,
			questions: faqContent[item],
		}));
		return res.render("pages/faq", { ...req.ctx, title: faqTitle, menu, contents });
	} catch (error) {
		console.error(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

router.get("/:name", (req: Request, res: Response, next: NextFunction) => {
	try {
		return res.render(`partials/sidebar/faq-content`, {
			...req.ctx,
			name: req.params.name,
			questions: faqContent[req.params.name],
		});
	} catch (error) {
		console.error(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

export const faqController = router;
